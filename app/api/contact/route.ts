import { NextResponse } from "next/server";
import { escapeHtml, validateEnquiry, type Enquiry } from "@/lib/contact";
import { site } from "@/lib/site";

// Services-site audit requests → Brevo transactional email API.
// Secrets are server-only (no NEXT_PUBLIC_ prefix). See .env.example.
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export const dynamic = "force-dynamic";

// Best-effort flood protection. Per server instance only, so it is a speed bump, not a guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
  toEmail: string;
}

function getConfig(): BrevoConfig | null {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) return null;
  return {
    apiKey,
    senderEmail,
    senderName: process.env.BREVO_SENDER_NAME || "Jeetu Prasad",
    toEmail: process.env.CONTACT_TO_EMAIL || site.email,
  };
}

function describe(err: unknown) {
  if (!(err instanceof Error)) return String(err);
  const cause = (err as Error & { cause?: unknown }).cause;
  return cause ? `${err.message} (cause: ${cause instanceof Error ? cause.message : String(cause)})` : err.message;
}

async function sendEmail(config: BrevoConfig, payload: Record<string, unknown>) {
  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": config.apiKey,
    },
    body: JSON.stringify({
      sender: { name: config.senderName, email: config.senderEmail },
      ...payload,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

function ownerEmail(e: Enquiry) {
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["Phone", e.phone || "—"],
    ["Needs", e.need],
    ["Current website", e.website || "—"],
    ["Source", `jeetuprasad.in (${e.source})`],
  ];
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6E5E53;font-weight:600">${k}</td><td style="padding:6px 0;color:#2B1F18">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return {
    subject: `New audit request: ${e.name} (${e.need})`,
    htmlContent: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#2B1F18">
<h2 style="margin:0 0 12px;color:#A65A2E">New free-audit request</h2>
<table style="border-collapse:collapse">${tableRows}</table>
<p style="margin:20px 0 6px;color:#6E5E53;font-weight:600">Business &amp; goal</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(e.message)}</p>
<p style="margin:24px 0 0;font-size:13px;color:#6E5E53">Reply to this email to answer ${escapeHtml(e.name)} directly.</p>
</div>`,
    textContent: `New free-audit request\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nBusiness & goal:\n${e.message}\n`,
  };
}

function acknowledgementEmail(e: Enquiry) {
  const firstName = e.name.split(" ")[0];
  const promise =
    "Thank you for your audit request. Within 24 hours I will email you three specific, honest fixes for your website or offer — whether we work together or not.";
  return {
    subject: "Your free audit request — Jeetu Prasad",
    htmlContent: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#2B1F18">
<p>Hi ${escapeHtml(firstName)},</p>
<p>${promise}</p>
<p>If it's urgent, you can call or WhatsApp me at <a href="${site.whatsappHref}" style="color:#A65A2E">${site.phoneDisplay}</a>.</p>
<p style="margin-top:24px">Jeetu Prasad<br><span style="color:#6E5E53">Websites &amp; funnels · <a href="${site.url}" style="color:#A65A2E">jeetuprasad.in</a></span></p>
</div>`,
    textContent: `Hi ${firstName},\n\n${promise}\n\nIf it's urgent, you can call or WhatsApp me at ${site.phoneDisplay}.\n\nJeetu Prasad\nWebsites & funnels · ${site.url}\n`,
  };
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    input = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → silently accept so bots learn nothing.
  if (typeof input.company === "string" && input.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages in a short time. Please try again later." },
      { status: 429 },
    );
  }

  const result = validateEnquiry(input);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const config = getConfig();
  if (!config) {
    console.error("[contact] BREVO_API_KEY / BREVO_SENDER_EMAIL are not set.");
    return NextResponse.json(
      { ok: false, error: "The form isn't available right now. Please email or WhatsApp me." },
      { status: 503 },
    );
  }

  const enquiry = result.data;

  try {
    await sendEmail(config, {
      to: [{ email: config.toEmail, name: "Jeetu Prasad" }],
      replyTo: { email: enquiry.email, name: enquiry.name },
      tags: ["website-enquiry"],
      ...ownerEmail(enquiry),
    });
  } catch (err) {
    console.error("[contact] Failed to send enquiry email:", describe(err));
    return NextResponse.json(
      { ok: false, error: "Your message couldn't be sent. Please try again in a moment." },
      { status: 502 },
    );
  }

  // The enquiry has reached Jeetu; a failed acknowledgement shouldn't fail the request.
  try {
    await sendEmail(config, {
      to: [{ email: enquiry.email, name: enquiry.name }],
      replyTo: { email: config.toEmail, name: "Jeetu Prasad" },
      tags: ["website-enquiry-ack"],
      ...acknowledgementEmail(enquiry),
    });
  } catch (err) {
    console.error("[contact] Enquiry delivered, acknowledgement failed:", describe(err));
  }

  return NextResponse.json({ ok: true });
}
