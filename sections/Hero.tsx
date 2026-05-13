"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Cpu,
  Code2,
  Zap,
  Brain,
  GitBranch,
  Database,
  Network,
  Sparkles,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import Terminal from "@/components/Terminal";

const stats = [
  { value: 5, suffix: "+", label: "Projects Built" },
  { value: 1, suffix: "+ yr", label: "MERN Experience" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 50, suffix: "+", label: "Commits" },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const SOCIALS = [
  {
    label: "GH",
    full: "GitHub",
    href: "https://github.com/jeetu-programmer7887",
  },
  {
    label: "LI",
    full: "LinkedIn",
    href: "https://www.linkedin.com/in/jeetu-prasad",
  },
  {
    label: "TH",
    full: "Threads",
    href: "https://www.threads.com/@jeetu_prasad143",
  },
];

// AI/Tech icons array with positions - using white, terminal green, and grey
const TECH_ICONS = [
  { Icon: Cpu, label: "CPU", color: "text-cream" },
  { Icon: Brain, label: "AI", color: "text-terminal" },
  { Icon: Code2, label: "Code", color: "text-cream/70" },
  { Icon: Zap, label: "Performance", color: "text-terminal/80" },
  { Icon: Database, label: "Database", color: "text-cream/60" },
  { Icon: Network, label: "Network", color: "text-terminal/70" },
  { Icon: GitBranch, label: "Git", color: "text-cream" },
  { Icon: Sparkles, label: "Innovation", color: "text-terminal/90" },
];

/* ─── Character Split Animation Helper ─── */
function AnimatedName({
  text,
  delay = 0,
  shouldReduceMotion,
}: {
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

/* ─── Floating Tech Icon Component ─── */
function FloatingTechIcon({
  Icon,
  index,
  shouldReduceMotion,
}: {
  Icon: React.ReactNode;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const randomDelay = Math.random() * 0.5;
  const randomDuration = 4 + Math.random() * 2;
  // Better spacing - icons in 2 columns with more vertical gap
  const yOffset = (index % 4) * 110 - 165;
  const xOffset = Math.floor(index / 4) * 90;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${100 + xOffset}px`,
        top: `${yOffset}px`,
      }}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [0, -16, 0],
              opacity: [0.5, 1, 0.5],
            }
      }
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.4, opacity: 1 }}
    >
      <motion.div
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-3xl"
      >
        {Icon}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -180],
  );
  const terminalY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -100],
  ); // Reduced pull

  // FIX: Changed opacity from [1, 0] to [1, 0.4] so it remains visible but subtly recedes
  const terminalOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    shouldReduceMotion ? [1, 1] : [1, 0.4],
  );

  const statsX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -120],
  );

  // Icons move with scroll
  const iconsY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -120],
  );

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-void"
    >
      {/* ── Noise texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
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
            transition={{
              duration: 0.6,
              delay: 1.2 + i * 0.1,
              ease: easeOutExpo,
            }}
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
          style={{
            background:
              "linear-gradient(to bottom,color-mix(in srgb, var(--cream), transparent 90%),transparent)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col px-8 pb-24 pt-32 md:px-16 lg:pl-28 lg:pr-16">
        {/* Role tag */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 1.0, ease: easeOutExpo }
          }
          className="mb-8 flex items-center gap-3"
        >
          <span
            className="inline-block h-[7px] w-[7px] animate-pulse bg-terminal"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-terminal/70">
            Full Stack Developer
          </span>
          <span
            className="h-px max-w-[80px] flex-1"
            style={{
              background:
                "linear-gradient(to right,color-mix(in srgb, var(--terminal), transparent 60%),transparent)",
            }}
          />
        </motion.div>

        {/* Name Block */}
        <motion.div style={{ y: nameY, willChange: "transform" }}>
          <h1
            className="select-none font-serif font-light leading-[0.82] tracking-[-0.02em] text-cream"
            style={{ fontSize: "clamp(5rem,15vw,15rem)" }}
          >
            <AnimatedName
              text="JEETU"
              delay={1.3}
              shouldReduceMotion={shouldReduceMotion}
            />
            <br />
            <div className="relative inline-block">
              <span
                className="relative inline-block"
                style={{
                  WebkitTextStroke:
                    "1px color-mix(in srgb, var(--cream), transparent 87%)",
                  color: "transparent",
                  backgroundImage:
                    "linear-gradient(130deg, var(--cream) 0%, color-mix(in srgb, var(--cream), transparent 55%) 55%, color-mix(in srgb, var(--terminal), transparent 72%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                <AnimatedName
                  text=" PRASAD"
                  delay={1}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </span>

              {/* Tech Icons Container */}
              <motion.div
                style={{ y: iconsY, willChange: "transform" }}
                className="absolute -right-72 -top-1/4 -translate-y-1/2 w-80 h-96 pointer-events-auto"
              >
                {TECH_ICONS.map((item, index) => (
                  <FloatingTechIcon
                    key={item.label}
                    Icon={
                      <item.Icon
                        size={48}
                        className={`${item.color} drop-shadow-lg filter brightness-125`}
                        strokeWidth={1.2}
                      />
                    }
                    index={index}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </motion.div>
            </div>
          </h1>
        </motion.div>

        {/* Divider with section index */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.9, delay: 1.9, ease: easeOutExpo }
          }
          style={{ transformOrigin: "left" }}
          className="my-8 flex items-center gap-4"
        >
          <div
            className="h-px flex-1 opacity-[0.18]"
            style={{
              background: "linear-gradient(to right, var(--cream),transparent)",
            }}
          />
          <span className="font-mono text-[10px] tabular-nums tracking-widest text-cream/20">
            001
          </span>
        </motion.div>

        {/* Terminal */}
        <motion.div
          className="mb-16 max-w-2xl"
          style={{
            y: terminalY,
            opacity: terminalOpacity,
            willChange: "transform,opacity",
          }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 2.1, ease: easeOutExpo }
            }
          >
            <Terminal />
          </motion.div>
        </motion.div>

        {/* Bottom row: Stats + CTA */}
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          {/* Overhauled Stat grid */}
          <motion.div
            style={{ x: statsX, willChange: "transform" }}
            className="w-full lg:max-w-3xl"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: 2.4, ease: easeOutExpo }
              }
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal"></span>
                </span>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-terminal/60">
                  Real-time Statistics
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="relative px-6 first:pl-0 border-r border-cream/5 last:border-r-0 max-sm:[&:nth-child(2)]:border-r-0"
                  >
                    <StatCard
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      delay={index * 150}
                    />
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-tighter text-cream/20">
                      Metric_{index + 1}
                    </p>
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
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, delay: 2.6, ease: easeOutExpo }
            }
            className="group relative shrink-0 overflow-hidden font-mono"
            style={{
              padding: "1.1rem 2.6rem",
              border:
                "1px solid color-mix(in srgb, var(--cream), transparent 86%)",
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
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
