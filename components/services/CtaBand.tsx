import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

interface CtaBandProps {
  id?: string;
  title?: string;
  highlight?: string;
  text?: string;
}

export default function CtaBand({
  id,
  title = "Let's build your",
  highlight = "website.",
  text = "One short call to understand your goals — then a clear, written quote.",
}: CtaBandProps) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[28px] bg-inverse px-6 py-12 text-inverse-ink sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-soft">Next step</p>
              <h2 className="heading-lg mt-4">
                {title} <span className="text-accent-soft">{highlight}</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-inverse-muted">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn bg-accent-soft text-[#241A14] hover:-translate-y-0.5">
                  Get a free quote
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-inverse-ink/20 text-inverse-ink hover:-translate-y-0.5 hover:border-inverse-ink/50"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border-t border-accent-soft/40 pt-4">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">Call / WhatsApp</dt>
                <dd className="mt-2 text-lg font-bold">
                  <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-accent-soft">
                    <Phone size={16} /> {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="border-t border-accent-soft/40 pt-4">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">Email</dt>
                <dd className="mt-2 text-lg font-bold">
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all hover:text-accent-soft">
                    <Mail size={16} className="shrink-0" /> {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
