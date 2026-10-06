import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

const explore = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/services#pricing" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

export default function SiteFooter() {
  return (
    <footer className="bg-inverse text-inverse-ink">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-extrabold tracking-[-0.02em]">Jeetu Prasad</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-accent-soft">
            Web development · Mumbai
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-inverse-muted">
            Fast, mobile-friendly websites and web apps for local businesses: built, launched and
            looked after.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-inverse-muted">Explore</p>
          <ul className="mt-4 space-y-3">
            {explore.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm font-semibold hover:text-accent-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-inverse-muted">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm font-semibold">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft">
                WhatsApp: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-accent-soft">
                Call: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-accent-soft">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-inverse-ink/10">
        <div className="container-site flex flex-col gap-5 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-inverse-muted transition-colors hover:text-inverse-ink"
          >
            Looking for a developer to hire? See my technical portfolio
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-inverse-muted">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-inverse-ink"
              >
                {s.label}
              </a>
            ))}
            <span>© {new Date().getFullYear()} Jeetu Prasad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
