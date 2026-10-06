import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Info, Sparkles, TrendingUp } from "lucide-react";
import CtaBand from "@/components/services/CtaBand";
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
      <section className="pb-12 pt-10 sm:pt-14">
        <div className="container-site">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-accent">
            <ArrowLeft size={16} /> All projects
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div className="animate-fade-up">
              <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-accent">{item.kind}</span>
              <h1 className="heading-xl mt-5 text-ink">{item.name}</h1>
              <p className="mt-5 text-xl font-semibold leading-snug text-ink">{item.summary}</p>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">{item.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={item.live} target="_blank" rel="noopener noreferrer" className="btn-primary !px-7 !py-3.5">
                  Visit the live site <ArrowUpRight size={18} />
                </a>
                <Link href="/contact" className="btn-secondary !px-7 !py-3.5">
                  I want something like this
                </Link>
              </div>
            </div>

            <div className="card relative aspect-[16/10] overflow-hidden animate-fade-up [animation-delay:120ms]">
              <Image
                src={item.image}
                alt={`${item.name} screenshot`}
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface/60 py-16 sm:py-20">
        <div className="container-site">
          <p className="eyebrow">Features</p>
          <h2 className="heading-lg mt-4 text-ink">What it does</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {item.features.map((feature) => (
              <li key={feature.title} className="card p-6">
                <span className="icon-chip !h-10 !w-10">
                  <Sparkles size={18} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card p-8">
            <p className="eyebrow">Benefits</p>
            <h2 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">What this means for a business</h2>
            <ul className="mt-6 space-y-4">
              {item.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 leading-relaxed text-ink">
                  <Check size={20} className="mt-0.5 shrink-0 text-accent" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-inverse p-8 text-inverse-ink">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-soft">Impact</p>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">What it changes</h2>
            <ul className="mt-6 space-y-4">
              {item.impact.map((point) => (
                <li key={point} className="flex items-start gap-3 leading-relaxed text-inverse-muted">
                  <TrendingUp size={20} className="mt-0.5 shrink-0 text-accent-soft" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-site mt-6">
          <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6">
            <p className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-accent">A good fit for</p>
            <ul className="flex flex-wrap gap-2">
              {item.goodFitFor.map((fit) => (
                <li key={fit} className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm font-semibold text-ink">
                  {fit}
                </li>
              ))}
            </ul>
          </div>

          {item.note && (
            <p className="mt-6 flex items-start gap-2 text-sm text-ink-muted">
              <Info size={16} className="mt-0.5 shrink-0" /> {item.note}
            </p>
          )}
        </div>
      </section>

      <section className="pb-4">
        <div className="container-site">
          <h2 className="text-xl font-bold text-ink">More projects</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/work/${other.slug}`}
                  className="card group flex items-center justify-between gap-4 p-5 transition-colors hover:border-accent/50"
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-accent">{other.kind}</span>
                    <span className="mt-1 block text-lg font-bold text-ink">{other.name}</span>
                  </span>
                  <ArrowUpRight size={20} className="shrink-0 text-ink-muted transition-colors group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Quiet door for technical visitors — opens the developer portfolio. */}
          <a
            href={`/portfolio/work/${item.slug}`}
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent"
          >
            Curious how it was built? Read the technical case study <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <CtaBand title="Want something like this for" highlight="your business?" />
    </>
  );
}
