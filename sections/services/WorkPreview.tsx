"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";
import TransitionLink from "@/components/services/motion/TransitionLink";
import { showcase } from "@/lib/showcase";

/**
 * "03 Concept builds" — on wide screens the project write-ups scroll past a pinned
 * browser window whose screenshot wipes to the project in view. On phones each
 * project shows its own screenshot inline.
 */
export default function WorkPreview() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1000px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const steps = stepsRef.current?.querySelectorAll<HTMLElement>("[data-wstep]");
      if (!steps) return;
      let current = 0;
      steps.forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const total = String(showcase.length).padStart(2, "0");

  return (
    <section id="work" data-anchor="work" className="panel bg-tint">
      <div className="container-site panel-y">
        <SectionHeading
          num="03"
          label="Concept builds"
          title="Real working builds — and what they mean for you."
          intro="These are my own projects, clearly labelled as concepts — never passed off as client work."
        />

        <div className="mt-14 grid grid-cols-1 items-start gap-x-16 gap-y-6 wide:grid-cols-2">
          <div ref={stepsRef}>
            {showcase.map((item, i) => (
              <article
                key={item.slug}
                data-wstep=""
                className={`flex flex-col justify-center gap-[18px] py-6 transition-opacity duration-[600ms] wide:min-h-[78vh] ${
                  wide && i !== active ? "opacity-[.35]" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[.14em]">
                  <span className="text-accent">0{i + 1}</span>
                  <span className="h-px w-6 bg-current opacity-40" />
                  <span className="text-muted">{item.kind}</span>
                </div>
                <h3 className="stretch-108 m-0 text-[clamp(30px,3.2vw,46px)] font-[750] leading-none tracking-[-0.035em]">
                  {item.name}
                </h3>
                <p className="m-0 max-w-[42ch] text-[17px] text-muted">{item.summary}</p>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-line bg-surface shadow wide:hidden">
                  <Image
                    src={item.image}
                    alt={`${item.name} — ${item.kind.toLowerCase()} screenshot`}
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="rounded-[22px] border border-line bg-surface px-5 py-[18px] shadow-sm">
                  <p className="caps m-0 mb-2.5 text-accent">For your business</p>
                  <ul className="flex flex-col gap-2">
                    {item.uses.map((use) => (
                      <li key={use} className="flex items-start gap-2.5 text-[15px] font-[550]">
                        <Check size={15} aria-hidden="true" className="mt-[3px] shrink-0 text-accent" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <TransitionLink href={`/work/${item.slug}`} label={item.name} className="link-underline">
                    See what it does <ArrowRight size={15} aria-hidden="true" />
                  </TransitionLink>
                  <a href={item.live} target="_blank" rel="noopener noreferrer" className="link-underline">
                    Open the live demo <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="sticky top-[110px] hidden h-[calc(100vh-150px)] max-h-[680px] flex-col overflow-hidden rounded-[30px] border border-line bg-surface shadow-lg wide:flex"
          >
            <div className="flex items-center gap-2.5 border-b border-line bg-surface-2 px-4 py-3">
              <span className="flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-2.5 w-2.5 rounded-full bg-tint" />
                ))}
              </span>
              <span className="flex-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
                {showcase[active]?.liveHost}
              </span>
              <span className="text-xs font-bold tabular-nums">
                {String(active + 1).padStart(2, "0")} / {total}
              </span>
            </div>
            <div className="relative min-h-0 flex-1">
              {showcase.map((item, i) => (
                <Image
                  key={item.slug}
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 560px, 45vw"
                  className="object-cover object-top"
                  style={{
                    transition: "clip-path 1s cubic-bezier(.76,0,.24,1), transform 1.4s cubic-bezier(.16,1,.3,1)",
                    clipPath: i <= active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                    transform: i === active ? "scale(1)" : "scale(1.06)",
                  }}
                />
              ))}
              <span className="absolute bottom-4 left-4 rounded-full bg-glass px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-chrome-ink backdrop-blur-md">
                Concept build
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
