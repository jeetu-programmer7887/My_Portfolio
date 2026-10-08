import Image from "next/image";
import { ArrowRight } from "lucide-react";
import TransitionLink from "./motion/TransitionLink";
import { navItems } from "@/lib/servicesNav";
import { site, whatsappLink } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
];

export default function SiteFooter() {
  return (
    <footer className="mx-[clamp(8px,1.5vw,20px)] mb-[clamp(8px,1.5vw,20px)] overflow-hidden rounded-[44px] bg-foot text-foot-ink transition-colors duration-500">
      <div className="container-site pt-[clamp(56px,7vw,96px)]">
        <div className="flex flex-wrap gap-x-16 gap-y-10">
          <div className="flex-[1.6_1_320px]">
            <Image
              src={site.servicesIcons.icon512}
              alt=""
              width={52}
              height={52}
              className="block h-[52px] w-[52px] rounded-full bg-[#FAF6F1]"
            />
            <p className="mt-5 max-w-[400px] text-lg leading-normal [text-wrap:pretty]">
              Websites that build trust. Funnels that turn visitors into customers. Built directly by one
              developer in Mumbai.
            </p>
          </div>

          <div className="flex-[1_1_160px]">
            <p className="mb-3.5 text-[11.5px] font-bold uppercase tracking-[.18em] text-foot-muted">Explore</p>
            <ul className="flex flex-col gap-[9px]">
              {navItems.map((item) => (
                <li key={item.anchor}>
                  <TransitionLink
                    href={`/#${item.anchor}`}
                    label={item.label}
                    className="text-[15px] font-semibold transition-colors duration-300 hover:text-foot-accent"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
              <li>
                <TransitionLink
                  href="/contact"
                  label="Free audit"
                  className="text-[15px] font-semibold transition-colors duration-300 hover:text-foot-accent"
                >
                  Free audit
                </TransitionLink>
              </li>
            </ul>
          </div>

          <div className="flex-[1_1_240px]">
            <p className="mb-3.5 text-[11.5px] font-bold uppercase tracking-[.18em] text-foot-muted">Get in touch</p>
            <ul className="flex flex-col gap-[9px] text-[15px] font-semibold">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-foot-accent">
                  WhatsApp: {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="hover:text-foot-accent">
                  Call: {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all hover:text-foot-accent">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="stretch-110 mt-[clamp(48px,7vw,96px)] whitespace-nowrap text-[clamp(52px,10.6vw,152px)] font-extrabold leading-[0.8] tracking-[-0.055em]"
        >
          Jeetu Prasad<span className="text-foot-accent">.</span>
        </p>
      </div>

      <div className="mt-[clamp(20px,3vw,36px)] border-t border-foot-line">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-3.5 py-5 text-[13.5px] text-foot-muted">
          {/* Plain <a>: the developer portfolio is a separate site with its own layout. */}
          <a href="/portfolio" className="group flex items-center gap-2 transition-colors hover:text-foot-ink">
            Hiring a developer? See my technical portfolio
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors hover:text-foot-ink"
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
