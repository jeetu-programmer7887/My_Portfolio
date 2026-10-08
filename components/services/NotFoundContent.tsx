import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PillLink from "./PillLink";
import TransitionLink from "./motion/TransitionLink";

const shortcuts = [
  { label: "Services & pricing", href: "/#pricing", curtain: "Pricing" },
  { label: "Concept builds", href: "/#work", curtain: "Work" },
  { label: "Free 3-point audit", href: "/contact", curtain: "Free audit" },
];

export default function NotFoundContent() {
  return (
    <section className="pt-28">
      <div className="container-site pb-[clamp(80px,10vw,140px)] pt-[clamp(40px,6vw,80px)]">
        <p
          data-fade=""
          className="stretch-115 m-0 text-[clamp(96px,18vw,240px)] font-extrabold leading-[0.85] tracking-[-0.06em] text-accent"
        >
          404
        </p>
        <h1 className="stretch-108 m-0 mt-6 text-[clamp(32px,3.6vw,54px)] font-[750] leading-[1.02] tracking-[-0.035em]">
          <span className="block overflow-hidden pb-[.08em]">
            <span data-line="" className="block">
              This page doesn&apos;t exist.
            </span>
          </span>
        </h1>
        <p
          data-fade=""
          style={{ "--i": 1 } as React.CSSProperties}
          className="lede mt-5 max-w-[520px]"
        >
          The link may be old or mistyped. Here are a few places that will help instead.
        </p>

        <div data-fade="" style={{ "--i": 2 } as React.CSSProperties} className="mt-8">
          <PillLink href="/" label="Jeetu Prasad" icon={ArrowLeft}>
            Back to home
          </PillLink>
        </div>

        <ul
          data-fade=""
          style={{ "--i": 3 } as React.CSSProperties}
          className="mt-12 grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3"
        >
          {shortcuts.map((s) => (
            <li key={s.href}>
              <TransitionLink
                href={s.href}
                label={s.curtain}
                className="card-lg group flex h-full items-center justify-between gap-3 p-[22px] font-bold transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                {s.label}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-500 ease-out group-hover:rotate-45">
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
