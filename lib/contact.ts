// Enquiry validation shared by the services contact form and /api/contact.

export const BUSINESS_TYPES = [
  "Shop / store",
  "Clinic",
  "Coaching centre",
  "Agency / marketer",
  "Other",
] as const;

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
  source: string;
}

type Result = { ok: true; data: Enquiry } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-\s]{6,20}$/;

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
  const business = oneLine(text(input.business, 40));
  const message = text(input.message, 5000);
  const source = input.source === "services" ? "services" : "unknown";

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (phone && !PHONE_RE.test(phone)) return { ok: false, error: "Please enter a valid phone number." };
  if (!(BUSINESS_TYPES as readonly string[]).includes(business)) {
    return { ok: false, error: "Please choose your type of business." };
  }
  if (message.length < 10) return { ok: false, error: "Please tell me a little more about what you need." };

  return { ok: true, data: { name, email, phone, business, message, source } };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
