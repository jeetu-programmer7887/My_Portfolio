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

  /* ── scroll-aware subtle scale ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.1, rootMargin: "-20% 0% -35% 0%" }
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
      const target = e.target as HTMLElement;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest('button[aria-label="Toggle menu"]')
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  return (
    <>
      {/* ── Floating capsule wrapper ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: easeOutExpo }}
        className="fixed left-0 right-0 top-0 z-50 flex justify-center px-6 pt-5 pointer-events-none"
      >
        <motion.header
          animate={{ scale: scrolled ? 0.985 : 1 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className={[
            "pointer-events-auto w-full max-w-[1350px] mx-auto",
            "rounded-full",
            "px-3 py-[15px]",
            /* glass core */
            "bg-[rgba(25,25,25,0.4)]",
            "backdrop-blur-[28px]",
            /* border stack: subtle top highlight + full ring */
            "border border-white/[0.09]",
            /* inset highlight on top edge */
            "shadow-[0_2px_0_0_rgba(255,255,255,0.04)_inset,0_32px_80px_-8px_rgba(0,0,0,0.72),0_8px_32px_-4px_rgba(0,0,0,0.5),0_0_0_0.5px_rgba(255,255,255,0.04)]",
            "transition-all duration-500",
          ].join(" ")}
          style={{
            /* top edge brighter than sides */
            borderTopColor: "rgba(255,255,255,0.16)",
          }}
        >
          <nav className="flex items-center justify-between">

            {/* ── Brand ── */}
            <a
              href="#"
              className="group flex items-center gap-2 font-mono text-[12.5px] tracking-[0.12em] text-cream transition-colors duration-300 hover:text-terminal ml-3 shrink-0"
            >
              <span className="relative">
                jeetu.dev
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-terminal transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </span>
              <span className="inline-block h-[13px] w-[7px] animate-blink rounded-[1px] bg-terminal shadow-[0_0_8px_rgba(57,255,20,0.6)]" />
            </a>

            {/* ── Desktop nav links ── */}
            <div className="hidden items-center gap-0.5 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={[
                      "relative px-4 py-[7px] font-mono text-[9.5px] uppercase tracking-[0.2em] transition-colors duration-250 rounded-full",
                      isActive
                        ? "text-terminal"
                        : "text-cream/50 hover:text-cream",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-terminal/[0.08] border border-terminal/[0.22] shadow-[0_0_14px_rgba(57,255,20,0.08)]"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
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
              className={[
                "hidden md:flex items-center gap-[7px]",
                "rounded-full px-5 py-[9px]",
                "font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream",
                "border border-white/10 bg-white/[0.03]",
                "backdrop-blur-sm",
                "transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:border-terminal/45 hover:text-terminal",
                "hover:shadow-[0_0_24px_rgba(57,255,20,0.14),0_0_0_1px_rgba(57,255,20,0.08)_inset]",
                "group relative overflow-hidden shrink-0",
              ].join(" ")}
            >
              {/* radial glow on hover */}
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_120%,rgba(57,255,20,0.12),transparent_70%)] opacity-0 transition-opacity duration-350 group-hover:opacity-100" />
              <span className="relative z-10">Hire Me</span>
              <span className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">→</span>
            </a>

            {/* ── Mobile hamburger ── */}
            <button
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex flex-col items-center justify-center gap-[5px] p-2 md:hidden relative z-[60]"
            >
              <span className={["block h-px w-5 bg-cream transition-all duration-300", mobileOpen ? "translate-y-[7px] rotate-45" : ""].join(" ")} />
              <span className={["block h-px w-5 bg-cream transition-all duration-300", mobileOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
              <span className={["block h-px w-5 bg-cream transition-all duration-300", mobileOpen ? "-translate-y-[7px] -rotate-45" : ""].join(" ")} />
            </button>
          </nav>
        </motion.header>
      </motion.div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className={[
              "fixed left-4 right-4 top-[5rem] z-40",
              "rounded-2xl p-6",
              "bg-[rgba(8,8,8,0.85)]",
              "backdrop-blur-[28px]",
              "border border-white/[0.08]",
              "shadow-[0_20px_60px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.06)_inset]",
            ].join(" ")}
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
                      ? "text-terminal bg-terminal/[0.08] border border-terminal/[0.15]"
                      : "text-cream/60 hover:text-cream hover:bg-white/[0.04]",
                  ].join(" ")}
                >
                  <span className="text-terminal/35 text-[10px] font-mono">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-6 border-t border-white/[0.05] pt-5">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-terminal/25 bg-terminal/[0.05] py-3 font-mono text-sm tracking-wider text-terminal transition-all duration-300 hover:border-terminal/45 hover:bg-terminal/[0.1]"
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
