"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { BUSINESS_TYPES } from "@/lib/contact";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass = "mb-2 block text-sm font-bold text-ink";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "services" }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !body.ok) {
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card flex flex-col items-start gap-4 p-8" role="status">
        <span className="icon-chip">
          <CircleCheck size={24} />
        </span>
        <h2 className="text-2xl font-extrabold text-ink">Thank you!</h2>
        <p className="text-lg leading-relaxed text-ink-muted">
          Your message is on its way. I will reply to you within 24 hours by email — a confirmation has
          been sent to your inbox.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-accent">
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="card relative space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input id="name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" placeholder="Full name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone / WhatsApp <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" maxLength={20} autoComplete="tel" placeholder="+91 98765 43210" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="business" className={labelClass}>
            Type of business
          </label>
          <select id="business" name="business" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose one
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Tell me about your business and what you'd like your website to do."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Spam trap: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-xl border border-accent/40 bg-surface-2 px-4 py-3 text-sm text-ink">
          {error}{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-accent underline">
            Message me on WhatsApp instead
          </a>
          .
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className="btn-primary !px-7 !py-3.5 text-base">
          {sending ? (
            <>
              <LoaderCircle size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={18} /> Send message
            </>
          )}
        </button>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-accent"
        >
          <MessageCircle size={16} /> Prefer WhatsApp?
        </a>
      </div>
    </form>
  );
}
