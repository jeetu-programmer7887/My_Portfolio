"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import StatCard from "@/components/StatCard";
import Terminal from "@/components/Terminal";

const stats = [
  { value: 5,  suffix: "+",      label: "Projects Built" },
  { value: 1,  suffix: "+ yr",  label: "MERN Experience" },
  { value: 10, suffix: "+",     label: "Technologies" },
  { value: 50, suffix: "+",     label: "Commits" },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const SOCIALS = [
  { label: "GH", full: "GitHub",   href: "https://github.com/jeetu-programmer7887" },
  { label: "LI", full: "LinkedIn", href: "https://www.linkedin.com/in/jeetu-prasad" },
  { label: "TH", full: "Threads",  href: "https://www.threads.com/@jeetu_prasad143" },
];

/* ─── Character Split Animation Helper ─── */
function AnimatedName({ text, delay = 0, shouldReduceMotion }: { 
  text: string; 
  delay?: number; 
  shouldReduceMotion: boolean | null; 
}) {
  if (shouldReduceMotion) return <span>{text}</span>;
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 80, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 1.2,
            delay: delay + i * 0.04,
            ease: easeOutExpo,
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const nameY           = useTransform(scrollYProgress, [0, 1],   shouldReduceMotion ? [0, 0]    : [0, -180]);
  const terminalY       = useTransform(scrollYProgress, [0, 1],   shouldReduceMotion ? [0, 0]    : [0, -135]);
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.4], shouldReduceMotion ? [1, 1]    : [1, 0]);
  const statsX          = useTransform(scrollYProgress, [0, 1],   shouldReduceMotion ? [0, 0]    : [0, -160]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-void"
    >
      {/* ── Noise texture (SVG paths must remain hex, but opacity is handled) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Scanlines ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,color-mix(in srgb, var(--cream), transparent 98%) 2px,color-mix(in srgb, var(--cream), transparent 98%) 4px)",
        }}
      />

      {/* ── Terminal green spotlight ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 8% 12%, color-mix(in srgb, var(--terminal), transparent 94%) 0%, transparent 70%)",
        }}
      />

      {/* ── Vertical rule — left ── */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-0 z-10 hidden h-full w-px md:block"
        style={{
          background:
            "linear-gradient(to bottom,transparent 0%,color-mix(in srgb, var(--cream), transparent 93%) 20%,color-mix(in srgb, var(--cream), transparent 93%) 80%,transparent 100%)",
        }}
      />

      {/* ── Social sidebar ── */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        {SOCIALS.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.full}
            title={s.full}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + i * 0.1, ease: easeOutExpo }}
            className="group relative"
          >
            <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-terminal/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 uppercase">
              {s.full}
            </span>
            <span className="flex h-7 w-7 items-center justify-center border border-white/10 bg-white/[0.03] font-mono text-[9px] tracking-widest text-cream/30 transition-all duration-300 hover:border-terminal/60 hover:bg-terminal/5 hover:text-terminal">
              {s.label}
            </span>
          </motion.a>
        ))}
        <div
          className="mt-1 h-20 w-px"
          style={{ background: "linear-gradient(to bottom,color-mix(in srgb, var(--cream), transparent 90%),transparent)" }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col px-8 pb-24 pt-32 md:px-16 lg:px-28">

        {/* Role tag */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 1.0, ease: easeOutExpo }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="inline-block h-[7px] w-[7px] animate-pulse bg-terminal" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-terminal/70">
            Full Stack Developer
          </span>
          <span
            className="h-px max-w-[80px] flex-1"
            style={{ background: "linear-gradient(to right,color-mix(in srgb, var(--terminal), transparent 60%),transparent)" }}
          />
        </motion.div>

        {/* Name Block */}
        <motion.div style={{ y: nameY, willChange: "transform" }}>
          <h1
            className="select-none font-serif font-light leading-[0.82] tracking-[-0.02em] text-cream"
            style={{ fontSize: "clamp(5rem,15vw,15rem)" }}
          >
            <AnimatedName text="JEETU" delay={1.3} shouldReduceMotion={shouldReduceMotion} />
            <br />
            <span
              className="relative inline-block"
              style={{
                WebkitTextStroke: "1px color-mix(in srgb, var(--cream), transparent 87%)",
                color: "transparent",
                backgroundImage:
                  "linear-gradient(130deg, var(--cream) 0%, color-mix(in srgb, var(--cream), transparent 55%) 55%, color-mix(in srgb, var(--terminal), transparent 72%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <AnimatedName text=" PRASAD" delay={1} shouldReduceMotion={shouldReduceMotion} />
            </span>
          </h1>
        </motion.div>

        {/* Divider with section index */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay: 1.9, ease: easeOutExpo }}
          style={{ transformOrigin: "left" }}
          className="my-8 flex items-center gap-4"
        >
          <div
            className="h-px flex-1 opacity-[0.18]"
            style={{ background: "linear-gradient(to right, var(--cream),transparent)" }}
          />
          <span className="font-mono text-[10px] tabular-nums tracking-widest text-cream/20">
            001
          </span>
        </motion.div>

        {/* Terminal */}
        <motion.div
          className="mb-16 max-w-2xl"
          style={{ y: terminalY, opacity: terminalOpacity, willChange: "transform,opacity" }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 2.1, ease: easeOutExpo }}
          >
            <Terminal />
          </motion.div>
        </motion.div>

        {/* Bottom row: Stats + CTA */}
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">

          {/* Stat grid */}
          <motion.div style={{ x: statsX, willChange: "transform" }} className="w-full lg:max-w-2xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 2.4, ease: easeOutExpo }}
            >
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/20">
                At a glance
              </p>

              <div
                className="grid grid-cols-2 sm:grid-cols-4"
                style={{
                  border: "1px solid color-mix(in srgb, var(--cream), transparent 93%)",
                  background: "color-mix(in srgb, var(--cream), transparent 97.8%)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="relative border-r border-white/[0.05] px-5 py-5 last:border-r-0 max-sm:border-b max-sm:[&:nth-child(2)]:border-r-0"
                  >
                    {index === 0 && (
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-px w-full"
                        style={{ background: "linear-gradient(to right, color-mix(in srgb, var(--terminal), transparent 45%), transparent)" }}
                      />
                    )}
                    <StatCard
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      delay={index * 150}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* CTA button */}
          <motion.a
            href="#contact"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 2.6, ease: easeOutExpo }}
            className="group relative shrink-0 overflow-hidden font-mono"
            style={{
              padding: "1.1rem 2.6rem",
              border: "1px solid color-mix(in srgb, var(--cream), transparent 86%)",
              background: "color-mix(in srgb, var(--cream), transparent 96.5%)",
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-y-full bg-terminal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
            />
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-px bg-terminal/40"
            />
            <span className="relative z-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cream transition-colors duration-300 group-hover:text-void">
              Hire Me
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}