"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    code: "GH",
    href: "https://github.com/jeetu-programmer7887",
    label: "GitHub",
  },
  {
    code: "LI",
    href: "https://www.linkedin.com/in/jeetu-prasad",
    label: "LinkedIn",
  },
  {
    code: "TH",
    href: "https://www.threads.com/@jeetu_prasad143",
    label: "Threads",
  },
];

const RESUME_URL = "https://drive.google.com/file/d/1a8_87FbhGhImY-LQH_jK-3_9VtlQKIkO/view?usp=sharing"

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
          timeZone: "Asia/Kolkata",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative mt-20 border-t border-white/[0.08] bg-[#080808] px-6 py-16 md:px-12 lg:px-24">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-terminal/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── TOP: BIG CTA ── */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl font-light leading-tight tracking-tight text-cream md:text-7xl"
            >
              READY TO <br />
              <span className="text-terminal">COLLABORATE?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-md font-body text-base leading-relaxed text-cream/60"
            >
              Currently available for freelance opportunities and full-time
              positions. Let&apos;s build something exceptional together.
            </motion.p>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center lg:justify-end">
            {/* RESUME BUTTON */}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative h-[64px] min-w-[180px] overflow-hidden rounded-full border border-white/10 bg-white/[0.02] px-8 transition-all duration-500 hover:border-white/20"
            >
              <div className="relative z-10 flex h-full items-center justify-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-cream/60 transition-colors duration-500 group-hover:text-white">
                <span>View CV</span>
                <span className="text-[10px] opacity-40 transition-transform duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                  ↗
                </span>
              </div>
              <div className="absolute inset-0 -translate-x-full bg-white/[0.08] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </motion.a>

            {/* GET IN TOUCH BUTTON */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative h-[64px] min-w-[220px] overflow-hidden rounded-full border border-terminal/40 bg-terminal/5 px-10 transition-all duration-500 hover:border-terminal hover:shadow-[0_0_30px_rgba(0,255,140,0.1)]"
            >
              <div className="relative z-10 flex h-full items-center justify-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-terminal transition-colors duration-500 group-hover:text-black">
                <span>Get in touch</span>
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
              <div className="absolute inset-0 -translate-x-full bg-terminal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </motion.a>
          </div>
        </div>

        {/* ── MIDDLE: GRID ── */}
        <div className="grid grid-cols-1 gap-12 border-t border-white/[0.08] py-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-5">
            <div className="font-mono text-xl tracking-wider text-cream">
              jeetu.dev
              <span className="ml-1 inline-block h-5 w-2 animate-blink bg-terminal align-middle" />
            </div>
            <p className="font-body text-sm leading-relaxed text-cream/50">
              Full-stack developer crafting fast, accessible, and obsessively
              well-built products.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cream/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal" />
              </span>
              Systems Operational
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream">
              Navigation
            </p>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="w-fit font-mono text-sm uppercase tracking-widest text-cream/60 transition-colors duration-200 hover:text-terminal"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col gap-3">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream">
              Connect
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.code}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] font-mono text-xs text-cream/60 transition-all duration-200 hover:border-terminal/50 hover:bg-terminal/5 hover:text-terminal"
                >
                  {social.code}
                </a>
              ))}
            </div>
            <p className="mt-2 font-body text-xs text-cream/35">
              Open to DMs and project discussions.
            </p>
          </div>

          {/* Column 4: Local Time (Fixed un-nesting) */}
          <div className="flex flex-col gap-3 md:items-start lg:items-end">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream">
              Local Time
            </p>
            <div className="font-mono text-sm tabular-nums tracking-widest text-cream/70">
              {time || "00:00:00 AM IST"}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-cream/35">
              IST · UTC +5:30
            </div>
          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
            &copy; 2026 Jeetu Prasad · All rights reserved
          </p>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-cream">
            <span>Based in Mumbai, India</span>
            <span className="text-cream/15">|</span>
            <span>19.2183° N, 72.9781° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
