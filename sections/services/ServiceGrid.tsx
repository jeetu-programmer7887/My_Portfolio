import Link from "next/link";
import { ArrowRight, Globe, Lightbulb, LockKeyhole, MessageCircle, ShoppingBag, Wrench } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const services = [
  {
    icon: Globe,
    title: "Business websites",
    text: "Websites and landing pages that turn visitors into enquiries.",
  },
  {
    icon: ShoppingBag,
    title: "Stores & web apps",
    text: "Small online stores and custom apps built for your business.",
  },
  {
    icon: Lightbulb,
    title: "Smart AI features",
    text: "Chatbots and smart search that help customers find answers.",
  },
  {
    icon: LockKeyhole,
    title: "Logins & dashboards",
    text: "Secure accounts, easy admin panels and a smooth go-live.",
  },
  {
    icon: Wrench,
    title: "Fixes & upgrades",
    text: "Bug fixes and improvements for your existing website.",
  },
];

export default function ServiceGrid({ showLink = true }: { showLink?: boolean }) {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Services" title="What I build for you" />
          {showLink && (
            <Link href="/services" className="link-accent shrink-0">
              Services &amp; pricing <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card p-7">
              <span className="icon-chip">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
            </li>
          ))}
          <li className="rounded-2xl bg-inverse p-7 text-inverse-ink">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-ink">
              <MessageCircle size={22} strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 text-xl font-bold">Not sure yet?</h3>
            <p className="mt-2 leading-relaxed text-inverse-muted">
              Tell me your goal — I&apos;ll suggest the simplest thing that works.
            </p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 font-bold text-accent-soft hover:underline">
              Ask me <ArrowRight size={16} />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
