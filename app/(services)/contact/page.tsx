import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/services/ContactForm";
import { site, whatsappLink } from "@/lib/site";

const description =
  "Get a free 3-point audit of your website or offer from Jeetu Prasad — three specific, honest fixes within 24 hours. Call or WhatsApp +91 78877 83809.";

export const metadata: Metadata = {
  title: "Free Website & Funnel Audit",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    url: "/contact",
    title: "Free Website & Funnel Audit | Jeetu Prasad",
    description,
  },
};

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink(), external: true },
  { icon: Phone, label: "Call", value: site.phoneDisplay, href: site.phoneHref, external: false },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
];

const headline = [
  <>Let&apos;s find what&apos;s</>,
  <>
    costing you <span className="text-accent">customers.</span>
  </>,
];

export default function ContactPage() {
  return (
    <section className="pt-28">
      <div className="container-site flex flex-wrap items-start gap-x-[72px] gap-y-14 pb-[clamp(80px,10vw,140px)] pt-[clamp(40px,6vw,80px)]">
        <div className="flex-[1_1_380px]">
          <div
            data-fade=""
            style={{ "--i": 0 } as React.CSSProperties}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-2 pr-3.5 text-[12.5px] font-semibold shadow-sm"
          >
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-bold text-accent">Free audit</span>
            <span className="text-muted">Reply within 24 hours</span>
          </div>
          <h1 className="stretch-108 m-0 mt-[26px] text-[clamp(40px,4.6vw,72px)] font-[750] leading-none tracking-[-0.04em]">
            {headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[.08em]">
                <span data-line="" style={{ "--i": i } as React.CSSProperties} className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-fade=""
            style={{ "--i": 1 } as React.CSSProperties}
            className="m-0 mt-[18px] max-w-[540px] text-[17px] leading-[1.6] text-muted [text-wrap:pretty]"
          >
            Tell me about your business. I&apos;ll review your current site or offer and send three specific fixes —
            then a clear, written quote if you want one.
          </p>

          <ul data-fade="" style={{ "--i": 2 } as React.CSSProperties} className="mt-9 flex flex-col gap-2">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-[28px] border border-line bg-surface px-[18px] py-4 shadow-sm transition-[transform,box-shadow] duration-500 ease-out hover:translate-x-1.5 hover:shadow"
                >
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[13px] bg-accent-soft text-accent">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-[.16em] text-muted">{label}</span>
                    <span className="block break-all text-[17px] font-bold">{value}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-fade=""
          style={{ "--i": 3 } as React.CSSProperties}
          className="flex-[1.25_1_460px] overflow-hidden rounded-[32px] border border-line bg-surface shadow-lg"
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
