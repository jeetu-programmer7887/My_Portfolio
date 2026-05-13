"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ── scroll‑aware glass ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));

    // A single observer is more efficient
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If it's intersecting, set it as active
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-20% 0% -35% 0%"
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── close mobile menu on outside click ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: easeOutExpo }}
        className={[
          "fixed left-0 right-0 top-0 z-50 px-6 md:px-12 transition-all duration-500",
          scrolled
            ? [
              "py-3",
              "bg-[rgba(8,8,8,0.65)]",
              "backdrop-blur-2xl",
              "border-b border-white/[0.06]",
              "shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]",
            ].join(" ")
            : "py-5 bg-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          {/* ── Brand ── */}
          <a
            href="#"
            className="group flex items-center gap-2 font-mono text-sm tracking-wider text-cream transition-colors duration-300 hover:text-terminal"
          >
            <span className="relative">
              jeetu.dev
              {/* terminal‑green underline on hover */}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terminal transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </span>
            <span className="inline-block h-4 w-2 animate-blink bg-terminal" />
          </a>

          {/* ── Desktop nav links ── */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={[
                    "relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive ? "text-terminal" : "text-cream/60 hover:text-cream",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-terminal/10 border border-terminal/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 font-mono text-[11px] tracking-wider text-cream backdrop-blur-sm transition-all duration-400 hover:border-terminal/50 hover:bg-terminal/5 hover:text-terminal hover:shadow-[0_0_24px_rgba(57,255,20,0.12)]"
          >
            Hire Me
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex flex-col items-center justify-center gap-1.5 md:hidden p-2"
          >
            <span
              className={[
                "block h-px w-6 bg-cream transition-all duration-300",
                mobileOpen ? "translate-y-[5px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px w-6 bg-cream transition-all duration-300",
                mobileOpen ? "opacity-0 scale-x-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px w-6 bg-cream transition-all duration-300",
                mobileOpen ? "-translate-y-[5px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed left-4 right-4 top-[4.5rem] z-40 rounded-2xl border border-white/[0.08] bg-[rgba(8,8,8,0.85)] p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: easeOutExpo }}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-wider transition-colors duration-200",
                    activeSection === item.href.slice(1)
                      ? "text-terminal bg-terminal/10 border border-terminal/15"
                      : "text-cream/70 hover:text-cream hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  <span className="text-terminal/40 text-[10px]">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-6 border-t border-white/5 pt-6">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-terminal/30 bg-terminal/5 py-3 font-mono text-sm tracking-wider text-terminal"
              >
                Hire Me →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
