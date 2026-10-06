import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/services/ContactForm";
import { site, whatsappLink } from "@/lib/site";

const description =
  "Tell Jeetu Prasad about your business and get a clear, written quote for your website. Call or WhatsApp +91 78877 83809 — replies within 24 hours.";

export const metadata: Metadata = {
  title: "Contact — Get a Quote for Your Website",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    url: "/contact",
    title: "Contact | Jeetu Prasad",
    description,
  },
};

const channels = [
  { icon: MessageCircle, label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink(), external: true },
  { icon: Phone, label: "Call", value: site.phoneDisplay, href: site.phoneHref, external: false },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
];

export default function ContactPage() {
  return (
    <section className="py-12 sm:py-20">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div className="animate-fade-up">
          <p className="eyebrow">Contact</p>
          <h1 className="heading-xl mt-6 text-ink">
            Let&apos;s build your <span className="text-accent">website.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            One short call to understand your goals — then a clear, written quote. Send a message, or
            reach me directly.
          </p>

          <ul className="mt-10 space-y-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="card flex items-center gap-4 p-4 transition-colors hover:border-accent/50"
                >
                  <span className="icon-chip">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{label}</span>
                    <span className="block break-all font-bold text-ink">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-3 text-ink-muted">
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-accent" /> I reply within 24 hours.
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-accent" /> Based in Mumbai — working with businesses across
              the city.
            </li>
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
