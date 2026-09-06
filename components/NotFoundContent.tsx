"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Compass,
  CornerDownLeft,
  FolderGit2,
  Mail,
  TerminalSquare,
  User,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { easeOutExpo } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   404 — refined
   Same design vocabulary as Hero/Terminal (cream / terminal / void,
   font-display + font-mono + font-body, glass-strong, scanlines).
   Adds: keyboard-driven route jumper, live diagnostics readout,
   pointer-reactive glow, registration marks. No new dependencies.
   ──────────────────────────────────────────────────────────────── */

type Destination = {
  href: string;
  label: string;
  hint: string;
  icon: typeof Compass;
};

const DESTINATIONS: Destination[] = [
  { href: "/", label: "Home", hint: "start over", icon: TerminalSquare },
  { href: "/#work", label: "Projects", hint: "selected work", icon: FolderGit2 },
  { href: "/#about", label: "About", hint: "who I am", icon: User },
  { href: "/#contact", label: "Contact", hint: "say hello", icon: Mail },
];

/* ─── Terminal readout ─── */
function ErrorTerminal({ route }: { route: string }) {
  const lines = useMemo(
    () => [
      `> GET ${route}`,
      "> 404 — route not found in this repository",
      "> git blame: no commits touch this path",
      "> suggestion: return home_ ✓",
    ],
    [route],
  );

  const { displayedLines, activeLineIndex, shouldShowCursor, phase } = useTypewriter({
    lines,
    typingSpeed: 40,
    pauseDuration: 450,
    cursorPauseDuration: 200,
    variance: 15,
  });

  const lastFilled = displayedLines.reduce(
    (acc, line, i) => (line.length > 0 ? i : acc),
    -1,
  );
  const visibleLineCount = Math.max(activeLineIndex + 1, lastFilled + 1);

  return (
    <div className="glass-strong relative w-full overflow-hidden rounded-lg border border-terminal/20 p-6">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-terminal/40 to-transparent" />

      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-2 opacity-40">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
        <span className="ml-2 font-mono text-[10px] text-mouse-gray">bash — 404</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-red-400/60">
          exit 1
        </span>
      </div>

      <div className="min-h-[6.5rem] space-y-1 font-mono text-sm leading-relaxed">
        {displayedLines.slice(0, visibleLineCount).map((line, index) => (
          <div key={index} className={index === 1 ? "text-red-400/80" : "text-cream/90"}>
            <span className="break-all">{line}</span>
            {index === activeLineIndex && shouldShowCursor && phase !== "reduced" && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-terminal align-[-2px]" />
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terminal/20 to-transparent" />
    </div>
  );
}

/* ─── Glitching 404 numeral ─── */
function GlitchNumeral({ reduced }: { reduced: boolean }) {
  const size = { fontSize: "clamp(5.5rem,17vw,15rem)" } as const;

  return (
    <div className="flex w-full justify-center lg:justify-start" aria-hidden="true">
      {/* Tight wrapper keeps absolute overlays restricted to the exact text width */}
      <div className="relative inline-block select-none">
        <h1
          className="relative inline-block font-display font-light leading-[0.82] tracking-[-0.03em]"
          style={{
            ...size,
            WebkitTextStroke: "1px color-mix(in srgb, var(--cream), transparent 87%)",
            color: "transparent",
            backgroundImage:
              "linear-gradient(130deg, var(--cream) 0%, color-mix(in srgb, var(--cream), transparent 55%) 55%, color-mix(in srgb, var(--terminal), transparent 72%) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        {!reduced && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-0 inline-block font-display font-light leading-[0.82] tracking-[-0.03em] text-terminal/50 mix-blend-screen"
              style={size}
              animate={{ x: [0, -5, 3, 0], opacity: [0, 0.5, 0, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
            >
              404
            </motion.span>
            <motion.span
              className="pointer-events-none absolute inset-0 inline-block font-display font-light leading-[0.82] tracking-[-0.03em] text-red-500/40 mix-blend-screen"
              style={size}
              animate={{ x: [0, 5, -3, 0], opacity: [0, 0.4, 0, 0] }}
              transition={{
                duration: 2.6,
                delay: 0.08,
                repeat: Infinity,
                repeatDelay: 3.2,
                ease: "easeInOut",
              }}
            >
              404
            </motion.span>

            {/* horizontal scan sweep across the numeral */}
            <motion.span
              className="pointer-events-none absolute inset-x-0 h-[14%]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--terminal), transparent 80%), transparent)",
                mixBlendMode: "screen",
              }}
              animate={{ top: ["-14%", "100%"] }}
              transition={{ duration: 4.4, repeat: Infinity, repeatDelay: 2.4, ease: "linear" }}
            />
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Keyboard-driven route jumper ─── */
function RouteJumper({ reduced }: { reduced: boolean }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const armed = useRef(false);

  const move = useCallback((delta: number) => {
    armed.current = true;
    setActive((i) => (i + delta + DESTINATIONS.length) % DESTINATIONS.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter" && armed.current) {
        e.preventDefault();
        router.push(DESTINATIONS[active].href);
      } else if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, move, router]);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/35">
          Jump to
        </span>
        <span
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, color-mix(in srgb, var(--cream), transparent 88%), transparent)",
          }}
        />
        <span className="hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-cream/25 sm:flex">
          ↑↓
          <CornerDownLeft size={11} />
        </span>
      </div>

      <ul className="flex flex-col">
        {DESTINATIONS.map((dest, i) => {
          const Icon = dest.icon;
          const isActive = i === active;
          return (
            <li key={dest.href}>
              <Link
                href={dest.href}
                data-cursor="interactive"
                onMouseEnter={() => {
                  armed.current = true;
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                className="group relative flex items-center gap-4 border-b border-cream/[0.07] py-3.5 transition-colors duration-300"
                style={{
                  background: isActive
                    ? "color-mix(in srgb, var(--cream), transparent 97%)"
                    : "transparent",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px origin-top transition-transform duration-300"
                  style={{
                    background: "var(--terminal)",
                    transform: isActive ? "scaleY(1)" : "scaleY(0)",
                  }}
                />
                <span className="pl-4 font-mono text-[10px] tabular-nums text-cream/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon
                  size={14}
                  className={
                    isActive ? "text-terminal transition-colors" : "text-cream/40 transition-colors"
                  }
                />
                <span
                  className={`font-mono text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? "text-cream" : "text-cream/70"
                  }`}
                >
                  {dest.label}
                </span>
                <span className="ml-auto hidden font-mono text-[10px] tracking-[0.12em] text-cream/25 sm:block">
                  {dest.hint}
                </span>
                <ArrowUpRight
                  size={13}
                  className={`mr-1 shrink-0 transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-terminal opacity-100"
                      : reduced
                        ? "text-cream/30 opacity-60"
                        : "-translate-x-1 text-cream/30 opacity-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function NotFoundContent() {
  const shouldReduceMotion = useReducedMotion();
  const reduced = Boolean(shouldReduceMotion);
  const pathname = usePathname();
  const [route, setRoute] = useState("/unknown-route");
  const [glow, setGlow] = useState({ x: 50, y: 45 });

  useEffect(() => {
    if (pathname) setRoute(pathname);
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      setGlow({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const fade = (delay: number, y = 20) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: easeOutExpo },
  });

  return (
    <section className="scanlines relative flex min-h-screen flex-col justify-center overflow-hidden bg-transparent px-6 py-28 md:px-16 lg:py-32">
      {/* structural rules */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-0 z-10 hidden h-full w-px md:block"
        style={{
          background:
            "linear-gradient(to bottom,transparent 0%,color-mix(in srgb, var(--cream), transparent 93%) 20%,color-mix(in srgb, var(--cream), transparent 93%) 80%,transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-6 top-0 z-10 hidden h-full w-px lg:block"
        style={{
          background:
            "linear-gradient(to bottom,transparent 0%,color-mix(in srgb, var(--cream), transparent 95%) 30%,color-mix(in srgb, var(--cream), transparent 95%) 70%,transparent 100%)",
        }}
      />

      {/* pointer-reactive ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background: `radial-gradient(38rem 38rem at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--terminal), transparent 92%), transparent 70%)`,
          transition: reduced ? undefined : "background 400ms linear",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* ── left column ── */}
        <div className="flex flex-col items-start">
          <motion.div {...fade(0, -12)} className="mb-8 flex w-full items-center gap-3">
            <span
              className="inline-block h-[7px] w-[7px] animate-pulse bg-terminal"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-terminal/70">
              Route Not Found
            </span>
            <span
              className="h-px max-w-[120px] flex-1"
              style={{
                background:
                  "linear-gradient(to right,color-mix(in srgb, var(--terminal), transparent 20%),transparent)",
              }}
            />
          </motion.div>

          <motion.div {...fade(0.15, 40)} className="w-full">
            <GlitchNumeral reduced={reduced} />
          </motion.div>

          <h2 className="sr-only">404 — page not found</h2>

          <motion.div
            {...fade(0.45, 0)}
            className="my-8 flex w-full max-w-md items-center gap-4"
          >
            <span className="font-mono text-[10px] tabular-nums tracking-widest text-cream/50">
              ERR_404
            </span>
            <span
              className="h-px flex-1 opacity-[0.4]"
              style={{ background: "linear-gradient(to right, var(--cream), transparent)" }}
            />
            <span className="font-mono text-[10px] tabular-nums tracking-widest text-cream/30">
              {route.length > 28 ? `${route.slice(0, 28)}…` : route}
            </span>
          </motion.div>

          <motion.p
            {...fade(0.6)}
            className="max-w-lg font-body text-base leading-relaxed text-cream/60 md:text-lg"
            style={{ textWrap: "pretty" }}
          >
            This page either shipped to a branch that never got merged, or it never existed in
            the first place. Nothing here is broken — the path just isn&apos;t one of mine. Pick
            a destination below and you&apos;re back on solid ground.
          </motion.p>

          <motion.div
            {...fade(0.8)}
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/"
              data-cursor="interactive"
              className="group relative w-full shrink-0 overflow-hidden font-mono sm:w-auto"
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
              <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cream transition-colors duration-300 group-hover:text-void">
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                Back to Home
              </span>
            </Link>

            <Link
              href="/#work"
              data-cursor="interactive"
              className="flex w-full items-center justify-center gap-3 border border-cream/10 px-10 py-[1.1rem] font-mono text-[11px] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-terminal/40 hover:bg-white/5 hover:text-terminal sm:w-auto"
            >
              <Compass size={14} />
              View Projects
            </Link>
          </motion.div>
        </div>

        {/* ── right column ── */}
        <div className="flex w-full flex-col gap-10">
          <motion.div {...fade(0.9, 30)}>
            <ErrorTerminal route={route} />
          </motion.div>

          <motion.div {...fade(1.05, 24)}>
            <RouteJumper reduced={reduced} />
          </motion.div>
        </div>
      </div>

      {/* footer readout */}
      <motion.div
        {...fade(1.25, 0)}
        className="relative z-10 mx-auto mt-16 flex w-full max-w-6xl flex-col gap-3 border-t border-cream/[0.07] pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-cream sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="flex items-center gap-2">
          <TerminalSquare size={12} className="text-terminal/50" />
          status: lost_in_production // error_code: 404
        </span>
        <span className="hidden sm:block">
          press <span className="text-cream/50">esc</span> to go home
        </span>
      </motion.div>
    </section>
  );
}