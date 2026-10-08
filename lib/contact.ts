// Audit-request validation shared by the services contact form and /api/contact.

export const NEEDS = [
  "Business website",
  "Landing page",
  "Lead funnel",
  "Website + Funnel",
  "Agency partnership",
  "Not sure yet",
] as const;

export const DEFAULT_NEED: (typeof NEEDS)[number] = "Website + Funnel";

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  website: string;
  need: string;
  message: string;
  source: string;
}

type Result = { ok: true; data: Enquiry } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-\s]{6,20}$/;
// Lenient: "mysite.in", "www.mysite.in/page" and full https:// URLs all pass.
const WEBSITE_RE = /^(https?:\/\/)?[^\s/?#]+\.[^\s/?#]{2,}(\S*)$/i;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Single-line fields must not carry line breaks into email headers or subjects. */
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

export function validateEnquiry(input: Record<string, unknown>): Result {
  const name = oneLine(text(input.name, 100));
  const email = oneLine(text(input.email, 254));
  const phone = oneLine(text(input.phone, 20));
  const website = oneLine(text(input.website, 200));
  const need = oneLine(text(input.need, 40));
  const message = text(input.message, 5000);
  const source = input.source === "services" ? "services" : "unknown";

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (phone && !PHONE_RE.test(phone)) return { ok: false, error: "Please enter a valid phone number." };
  if (website && !WEBSITE_RE.test(website)) return { ok: false, error: "Please enter a valid website address." };
  if (!(NEEDS as readonly string[]).includes(need)) {
    return { ok: false, error: "Please choose what you need." };
  }
  if (message.length < 10) return { ok: false, error: "Please tell me a little more about your business and goal." };

  return { ok: true, data: { name, email, phone, website, need, message, source } };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
