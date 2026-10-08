"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeIndianRupee, LayoutTemplate, Megaphone, MessageSquareReply, MousePointerClick } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const stages = [
  { icon: Megaphone, title: "Traffic", text: "Google, Instagram, ads or referrals bring people in." },
  { icon: LayoutTemplate, title: "Page", text: "A focused page built around one offer and one action." },
  { icon: MousePointerClick, title: "Capture", text: "Form, WhatsApp or booking — the fewest taps possible." },
  { icon: MessageSquareReply, title: "Follow-up", text: "Instant replies and reminders so no lead goes cold." },
  { icon: BadgeIndianRupee, title: "Sale", text: "A call, a booking or a checkout. Then we measure." },
];

/**
 * "01 The idea" — on wide screens the section is pinned for ~3 screens of scroll
 * while a progress line fills and each funnel stage lights up in turn. On phones
 * (or with reduced motion) it's a plain section with every stage shown.
 */
export default function FunnelSteps() {
  const outerRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1000px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(wide.matches && !reduced.matches);
    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!pinned) {
      if (fillRef.current) fillRef.current.style.transform = "scaleX(1)";
      setStage(stages.length - 1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;
      setStage(Math.min(stages.length - 1, Math.floor(p * 5.2)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  return (
    <section
      ref={outerRef}
      id="how"
      data-anchor="how"
      className={`relative scroll-mt-0 ${pinned ? "h-[280vh]" : ""}`}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen items-center"
            : "relative flex items-center py-[clamp(72px,9vw,120px)]"
        }
      >
        <div className={`container-site ${pinned ? "pt-[72px]" : ""}`}>
          <SectionHeading
            num="01"
            label="The idea"
            titleWidth="17ch"
            title={
              <>
                A website is a destination. <span className="text-accent">A funnel is a process.</span>
              </>
            }
            intro="The page isn't the product — the journey is. I build every step between someone clicking and someone becoming your customer."
          />

          <div className="relative mt-14">
            <div aria-hidden="true" className="absolute inset-x-0 -top-6 h-0.5 rounded-sm bg-line">
              <div ref={fillRef} className="h-0.5 origin-left scale-x-0 rounded-sm bg-accent" />
            </div>
            <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-3">
              {stages.map(({ icon: Icon, title, text }, i) => {
                const on = i === stage;
                const dim = pinned && i > stage;
                return (
                  <li
                    key={title}
                    className={`relative flex min-h-[230px] flex-col gap-7 rounded-[26px] border border-line p-[22px] transition-[background-color,color,transform,box-shadow,opacity] duration-[600ms] ease-out ${
                      on ? "-translate-y-2.5 bg-accent text-accent-ink shadow-lg" : "bg-surface text-ink shadow-sm"
                    } ${dim ? "opacity-[.55]" : "opacity-100"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-[14px] text-accent transition-colors duration-[600ms] ${
                          on ? "bg-accent-ink" : "bg-accent-soft"
                        }`}
                      >
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold tracking-[.12em] opacity-60">0{i + 1}</span>
                    </div>
                    <div className="mt-auto">
                      <h3 className="stretch-106 m-0 text-[22px] font-[750] tracking-[-0.025em]">{title}</h3>
                      <p
                        className={`m-0 mt-2 text-[14.5px] leading-normal transition-colors duration-[600ms] ${
                          on ? "text-accent-ink" : "text-muted"
                        }`}
                      >
                        {text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
