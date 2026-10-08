"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { DEFAULT_NEED, NEEDS } from "@/lib/contact";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const labelClass = "flex flex-col gap-2 text-[13px] font-bold";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [need, setNeed] = useState<string>(DEFAULT_NEED);

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
        body: JSON.stringify({ ...data, need, source: "services" }),
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
      <div role="status" className="flex flex-col items-start gap-3.5 p-[clamp(28px,4vw,48px)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CircleCheck size={26} aria-hidden="true" />
        </span>
        <h2 className="m-0 text-[clamp(30px,3vw,42px)] font-[750] tracking-[-0.035em]">Audit request received.</h2>
        <p className="m-0 text-base text-muted">
          I&apos;ll send your three fixes by email within 24 hours. A confirmation is on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1.5 cursor-pointer border-0 bg-transparent p-0 font-bold text-accent underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5 p-[clamp(24px,3.4vw,40px)]">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-2.5 p-0 text-[13px] font-bold">What do you need?</legend>
        <div role="radiogroup" aria-label="What do you need?" className="flex flex-wrap gap-1.5">
          {NEEDS.map((label) => {
            const on = need === label;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setNeed(label)}
                className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  on ? "border-ink bg-ink text-canvas" : "border-line bg-surface text-ink hover:border-accent"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-4">
        <label className={`${labelClass} flex-[1_1_220px]`}>
          Your name
          <input name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" placeholder="Full name" className="field" />
        </label>
        <label className={`${labelClass} flex-[1_1_220px]`}>
          Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" className="field" />
        </label>
        <label className={`${labelClass} flex-[1_1_220px]`}>
          <span>
            Phone / WhatsApp <span className="font-normal text-muted">(optional)</span>
          </span>
          <input name="phone" type="tel" maxLength={20} autoComplete="tel" placeholder="+91 98765 43210" className="field" />
        </label>
        <label className={`${labelClass} flex-[1_1_220px]`}>
          <span>
            Current website <span className="font-normal text-muted">(if any)</span>
          </span>
          {/* type="text" so "mysite.in" without https:// is accepted. */}
          <input name="website" type="text" inputMode="url" maxLength={200} autoComplete="url" placeholder="https://" className="field" />
        </label>
      </div>

      <label className={labelClass}>
        Your business &amp; goal
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="What do you sell, who to, and what should the site or funnel achieve?"
          className="field resize-y"
        />
      </label>

      {/* Spam trap: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-[14px] border border-accent bg-accent-soft px-4 py-3 text-sm text-ink">
          {error}{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-accent underline">
            Message me on WhatsApp instead
          </a>
          .
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <button type="submit" disabled={sending} className="btn-pill btn-accent border-0">
          <span>{sending ? "Sending…" : "Request my free audit"}</span>
          <span className="btn-knob bg-accent-ink text-accent">
            {sending ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          </span>
        </button>
        <span className="text-[13px] text-muted">No spam. No obligation.</span>
      </div>
    </form>
  );
}
