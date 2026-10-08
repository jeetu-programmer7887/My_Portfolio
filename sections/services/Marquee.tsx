"use client";

import { useEffect, useRef } from "react";

const words = ["Dentists", "Clinics", "Salons", "Interior designers", "Coaches", "Consultants", "Course creators", "Agencies"];
// Two copies so the strip can loop seamlessly.
const strip = [...words, ...words];

/** Endless strip of business types; scrolling the page speeds it up. */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let lastY = window.scrollY;
    let frame = requestAnimationFrame(function tick() {
      frame = requestAnimationFrame(tick);
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;
      x -= 0.5 + Math.min(Math.abs(velocity), 80) * 0.2;
      const half = track.scrollWidth / 2;
      if (half && -x >= half) x += half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line py-[26px]">
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {strip.map((word, i) => (
          <span
            key={i}
            className={`stretch-112 flex items-center gap-8 pr-8 text-[clamp(26px,3vw,44px)] font-[750] leading-none tracking-[-0.035em] ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1.2px_var(--ink)]" : "text-ink"
            }`}
          >
            {word}
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
