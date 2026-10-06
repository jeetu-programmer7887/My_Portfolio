import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import HeroIllustration from "@/components/services/HeroIllustration";
import { whatsappLink } from "@/lib/site";

const promises = ["You own your website", "Pay as you see progress", "Reply within 24 hours"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-site grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pb-24">
        <div className="animate-fade-up">
          {/* The name stays inside the H1 so searches for "Jeetu Prasad" keep matching this page. */}
          <h1>
            <span className="eyebrow">Jeetu Prasad · Web developer in Mumbai</span>
            <span className="heading-xl mt-6 block text-ink">
              Websites that bring you <span className="text-accent">more customers.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl">
            Fast, mobile-friendly websites and web apps for local businesses — built, launched and
            looked after.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary !px-7 !py-3.5 text-base">
              Let&apos;s grow your business online
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !px-7 !py-3.5 text-base"
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-2 text-accent">
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <HeroIllustration className="mx-auto w-full max-w-[560px]" />
        </div>
      </div>
    </section>
  );
}
