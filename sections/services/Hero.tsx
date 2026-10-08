"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileCheck2, LayoutTemplate, Lock, MessageCircle, Phone, UserRoundCheck, Zap } from "lucide-react";
import PillLink from "@/components/services/PillLink";
import TransitionLink from "@/components/services/motion/TransitionLink";

const promises = [
  { icon: UserRoundCheck, text: "Built directly by one developer" },
  { icon: FileCheck2, text: "Clear, fixed scope" },
  { icon: Zap, text: "Fast delivery" },
];

const headline = [
  <>Websites &amp; funnels</>,
  <>that turn traffic</>,
  <>
    into <span className="text-accent">customers.</span>
  </>,
];

// A made-up business and made-up leads — the mockup is labelled "Concept demo".
const pipeline = [
  { label: "Visitor from Google", meta: "Search" },
  { label: "Tapped “Book on WhatsApp”", meta: "CTA" },
  { label: "Lead captured", meta: "Form" },
  { label: "Auto-reply sent", meta: "Follow-up" },
  { label: "Appointment booked", meta: "Sale" },
];
const leads = ["Priya · Andheri", "Rahul · Thane", "Sana · Bandra", "Amit · Powai"];

const EASE_OUT = "cubic-bezier(.16,1,.3,1)";

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Scroll drift + mouse parallax on the mockup layers ([data-depth]).
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(isReduced);
    if (isReduced) return;

    const grid = gridRef.current;
    const layers = grid ? Array.from(grid.querySelectorAll<HTMLElement>("[data-depth]")) : [];
    let frame = requestAnimationFrame(function tick() {
      frame = requestAnimationFrame(tick);
      const y = window.scrollY;
      if (!grid || y > window.innerHeight * 1.3) return;
      grid.style.transform = `translate3d(0,${y * 0.12}px,0)`;
      const p = pointer.current;
      p.x += (p.tx - p.x) * 0.07;
      p.y += (p.ty - p.y) * 0.07;
      layers.forEach((layer) => {
        const k = parseFloat(layer.dataset.depth ?? "1");
        layer.style.transform = `translate3d(${p.x * k * 14}px,${p.y * k * 10 - y * k * 0.05}px,0)`;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // The funnel card ticks through its steps; a new enquiry pops in on step 3.
  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % 8), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const toast = toastRef.current;
    if (!toast || reduced) return;
    if (step === 3) {
      setLead((n) => (n + 1) % leads.length);
      toast.animate(
        [
          { opacity: 0, transform: "translateY(-14px) scale(.92)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 700, easing: EASE_OUT, fill: "forwards" },
      );
    }
    if (step === 7) {
      toast.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(-10px)" }], {
        duration: 500,
        easing: "ease",
        fill: "forwards",
      });
    }
  }, [step, reduced]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.current.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
  };
  const onPointerLeave = () => {
    pointer.current.tx = 0;
    pointer.current.ty = 0;
  };

  return (
    <section onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="relative overflow-hidden pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[length:80px_80px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,#000_20%,transparent_75%)]"
      />
      <div
        ref={gridRef}
        className="container-site relative grid min-h-[calc(100svh-112px)] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-16 gap-y-12 pb-[72px]"
      >
        <div>
          <div
            data-fade=""
            style={{ "--i": 0 } as React.CSSProperties}
            className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pl-2 pr-3.5 text-[12.5px] font-semibold shadow-sm"
          >
            <span className="flex items-center gap-[7px] rounded-full bg-accent-soft px-2.5 py-1 font-bold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              Booking 5 founding clients
            </span>
            <span className="text-muted">Mumbai · replies in 24h</span>
          </div>

          {/* The name stays inside the H1 so searches for "Jeetu Prasad" keep matching this page. */}
          <h1 className="stretch-108 m-0 mt-7 text-[clamp(40px,4.8vw,76px)] font-[750] leading-none tracking-[-0.04em]">
            <span
              data-fade=""
              style={{ "--i": 1 } as React.CSSProperties}
              className="mb-4 block text-[12.5px] font-bold uppercase leading-normal tracking-[.2em] text-accent [font-stretch:100%]"
            >
              Jeetu Prasad · Web developer in Mumbai
            </span>
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
            style={{ "--i": 2 } as React.CSSProperties}
            className="m-0 mt-6 max-w-[500px] text-[clamp(16px,1.25vw,18.5px)] leading-[1.6] text-muted [text-wrap:pretty]"
          >
            Business websites that build trust. Landing pages and funnels that turn visitors into enquiries,
            bookings or sales.
          </p>

          <div data-fade="" style={{ "--i": 3 } as React.CSSProperties} className="mt-8 flex flex-wrap gap-3">
            <PillLink href="/contact" label="Free audit">
              Get a free 3-point audit
            </PillLink>
            <TransitionLink href="/#work" label="Work" className="btn-plain">
              <LayoutTemplate size={17} aria-hidden="true" />
              <span>See examples</span>
            </TransitionLink>
          </div>

          <ul
            data-fade=""
            style={{ "--i": 4 } as React.CSSProperties}
            className="mt-9 flex flex-wrap gap-x-[22px] gap-y-2.5 text-[13.5px] font-semibold text-muted"
          >
            {promises.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon size={16} aria-hidden="true" className="text-accent" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-fade=""
          style={{ "--i": 5 } as React.CSSProperties}
          aria-hidden="true"
          className="relative h-[clamp(460px,44vw,560px)]"
        >
          <div className="absolute inset-[8%_4%_0_10%] rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-[10px]" />

          {/* Browser mockup of a made-up clinic site. */}
          <div data-depth="0.6" className="absolute left-0 top-11 w-[86%] overflow-hidden rounded-[28px] border border-line bg-surface shadow-lg">
            <div className="flex items-center gap-2.5 border-b border-line bg-surface-2 px-3.5 py-3">
              <span className="flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-2.5 w-2.5 rounded-full bg-tint" />
                ))}
              </span>
              <span className="flex flex-1 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
                <Lock size={11} />
                yourclinic.in
              </span>
              <span className="rounded-full bg-accent-soft px-[9px] py-1 text-[10px] font-extrabold uppercase tracking-[.1em] text-accent">
                Concept demo
              </span>
            </div>
            <div className="p-[clamp(20px,2.4vw,30px)]">
              <p className="m-0 flex items-center gap-2 text-xs font-semibold text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                Andheri West · Open today till 8 pm
              </p>
              <p className="stretch-106 m-0 mt-3.5 max-w-[15ch] text-[clamp(22px,2.2vw,30px)] font-[750] leading-[1.08] tracking-[-0.03em]">
                Gentle dental care for the whole family.
              </p>
              <p className="m-0 mt-2.5 max-w-[34ch] text-sm text-muted">
                Same-week appointments. Tell us what hurts — we&apos;ll call you back today.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-[11px] text-[13px] font-bold text-accent-ink">
                  <MessageCircle size={14} />
                  Book on WhatsApp
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-[11px] text-[13px] font-bold">
                  <Phone size={14} />
                  Call clinic
                </span>
              </div>
            </div>
          </div>

          {/* "New enquiry" toast. */}
          <div data-depth="1.4" className="absolute right-[2%] top-0">
            <div
              ref={toastRef}
              className={`flex items-center gap-3 rounded-full border border-line bg-surface py-2.5 pl-2.5 pr-4 shadow-lg ${
                reduced ? "" : "opacity-0"
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle size={18} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold">New enquiry</span>
                <span className="text-xs text-muted">{leads[lead]}</span>
              </span>
              <span className="ml-1.5 text-[11px] font-semibold text-muted">now</span>
            </div>
          </div>

          {/* Live funnel card. */}
          <div
            data-depth="1"
            className="absolute bottom-0 right-0 w-[min(62%,330px)] rounded-[26px] bg-ink p-[18px] text-canvas shadow-lg"
          >
            <div className="mb-2.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-[.16em]">
              <span className="text-inv-accent">The funnel</span>
              <span className="flex items-center gap-1.5 text-inv-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
                Live
              </span>
            </div>
            {pipeline.map((row, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div
                  key={row.label}
                  className={`flex items-center gap-3 py-2 text-[13.5px] font-semibold transition-opacity duration-500 ${
                    done || active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <span
                    className={`relative flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] text-ink transition-colors duration-[450ms] ${
                      done ? "border-inv-accent bg-inv-accent" : active ? "border-inv-accent" : "border-[rgba(127,110,98,.6)]"
                    }`}
                  >
                    <Check size={12} className={`transition-opacity duration-300 ${done ? "opacity-100" : "opacity-0"}`} />
                  </span>
                  <span className="flex-1">{row.label}</span>
                  <span className="text-[11px] text-inv-muted">{row.meta}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
