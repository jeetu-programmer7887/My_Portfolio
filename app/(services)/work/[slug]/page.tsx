import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Info, Sparkles, TrendingUp } from "lucide-react";
import CtaBand from "@/components/services/CtaBand";
import PillLink from "@/components/services/PillLink";
import TransitionLink from "@/components/services/motion/TransitionLink";
import { getShowcaseItem, showcase } from "@/lib/showcase";

export function generateStaticParams() {
  return showcase.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getShowcaseItem(params.slug);
  if (!item) return {};

  const url = `/work/${item.slug}`;
  const title = `${item.name} — ${item.kind}`;

  return {
    title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: "Jeetu Prasad",
      url,
      title: `${title} | Jeetu Prasad`,
      description: item.summary,
      images: [{ url: item.image, alt: item.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Jeetu Prasad`,
      description: item.summary,
      images: [item.image],
    },
  };
}

export default function WorkItemPage({ params }: { params: { slug: string } }) {
  const item = getShowcaseItem(params.slug);
  if (!item) notFound();

  const others = showcase.filter((other) => other.slug !== item.slug);

  return (
    <>
      <section className="pt-28">
        <div className="container-site pb-[clamp(56px,7vw,96px)] pt-[clamp(24px,4vw,48px)]">
          <TransitionLink
            href="/#work"
            label="Work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </TransitionLink>

          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-16 gap-y-12">
            <div>
              <div
                data-fade=""
                style={{ "--i": 0 } as React.CSSProperties}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-2 pr-3.5 text-[12.5px] font-semibold shadow-sm"
              >
                <span className="rounded-full bg-accent-soft px-2.5 py-1 font-bold text-accent">{item.kind}</span>
                <span className="text-muted">A project I&apos;ve built</span>
              </div>
              <h1 className="stretch-108 m-0 mt-[26px] text-[clamp(40px,4.6vw,72px)] font-[750] leading-none tracking-[-0.04em]">
                <span className="block overflow-hidden pb-[.08em]">
                  <span data-line="" className="block">
                    {item.name}
                  </span>
                </span>
              </h1>
              <p
                data-fade=""
                style={{ "--i": 1 } as React.CSSProperties}
                className="m-0 mt-5 text-xl font-semibold leading-snug"
              >
                {item.summary}
              </p>
              <p
                data-fade=""
                style={{ "--i": 2 } as React.CSSProperties}
                className="m-0 mt-4 max-w-[560px] text-[17px] leading-[1.6] text-muted [text-wrap:pretty]"
              >
                {item.intro}
              </p>
              <div data-fade="" style={{ "--i": 3 } as React.CSSProperties} className="mt-8 flex flex-wrap gap-3">
                <a href={item.live} target="_blank" rel="noopener noreferrer" className="btn-pill btn-accent">
                  <span>Open the live demo</span>
                  <span className="btn-knob bg-accent-ink text-accent">
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </a>
                <TransitionLink href="/contact" label="Free audit" className="btn-plain">
                  I want something like this
                </TransitionLink>
              </div>
            </div>

            <div
              data-fade=""
              style={{ "--i": 4 } as React.CSSProperties}
              className="overflow-hidden rounded-[30px] border border-line bg-surface shadow-lg"
            >
              <div className="flex items-center gap-2.5 border-b border-line bg-surface-2 px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2.5 w-2.5 rounded-full bg-tint" />
                  ))}
                </span>
                <span className="flex-1 truncate rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
                  {item.liveHost}
                </span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={`${item.name} screenshot`}
                  fill
                  priority
                  sizes="(min-width: 1000px) 600px, 100vw"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-glass px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-chrome-ink backdrop-blur-md">
                  Concept build
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel bg-tint">
        <div className="container-site panel-y">
          <div data-reveal="" className="caps inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-3.5 shadow-sm">
            <span className="rounded-full bg-accent px-[9px] py-1 text-[10.5px] tracking-[.04em] text-accent-ink">01</span>
            Features
          </div>
          <h2 data-reveal="" className="h-section mt-5 max-w-[16ch]">
            What it does
          </h2>
          <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3.5">
            {item.features.map((feature) => (
              <li key={feature.title} data-reveal="" className="card-lg flex flex-col gap-5 p-[26px]">
                <span className="icon-tile">
                  <Sparkles size={18} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="m-0 text-xl font-[750] tracking-[-0.02em]">{feature.title}</h3>
                  <p className="m-0 mt-2 text-[14.5px] leading-normal text-muted">{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site section-y">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
          <div data-reveal="" className="card-lg p-[clamp(24px,3vw,36px)]">
            <p className="caps m-0 text-accent">Benefits</p>
            <h2 className="stretch-106 m-0 mt-4 text-[clamp(26px,2.4vw,34px)] font-[750] leading-[1.08] tracking-[-0.03em]">
              What this means for a business
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {item.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base leading-relaxed">
                  <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="" className="rounded-[28px] bg-ink p-[clamp(24px,3vw,36px)] text-canvas shadow">
            <p className="m-0 text-[11.5px] font-bold uppercase tracking-[.14em] text-inv-accent">Impact</p>
            <h2 className="stretch-106 m-0 mt-4 text-[clamp(26px,2.4vw,34px)] font-[750] leading-[1.08] tracking-[-0.03em]">
              What it changes
            </h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {item.impact.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-inv-muted">
                  <TrendingUp size={18} aria-hidden="true" className="mt-1 shrink-0 text-inv-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal="" className="card-soft mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 px-7 py-6">
          <p className="caps m-0 shrink-0 text-accent">A good fit for</p>
          <ul className="flex flex-wrap gap-1.5">
            {item.goodFitFor.map((fit) => (
              <li key={fit} className="rounded-full border border-line bg-surface px-3 py-[7px] text-[13px] font-semibold">
                {fit}
              </li>
            ))}
          </ul>
        </div>

        {item.note && (
          <p className="m-0 mt-6 flex items-start gap-2 text-sm text-muted">
            <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0" /> {item.note}
          </p>
        )}

        <div className="mt-[clamp(56px,7vw,96px)]">
          <h2 className="m-0 text-xl font-[750] tracking-[-0.02em]">More concept builds</h2>
          <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3.5">
            {others.map((other) => (
              <li key={other.slug}>
                <TransitionLink
                  href={`/work/${other.slug}`}
                  label={other.name}
                  className="card-lg group flex items-center justify-between gap-4 p-[22px] transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[.14em] text-accent">{other.kind}</span>
                    <span className="mt-1 block text-lg font-bold">{other.name}</span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-500 ease-out group-hover:rotate-45">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <PillLink href="/contact" label="Free audit">
              Get a free 3-point audit
            </PillLink>
            {/* Quiet door for technical visitors — opens the developer portfolio (a separate site). */}
            <a
              href={`/portfolio/work/${item.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              Curious how it was built? Read the technical case study <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
