"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import TransitionLink from "./motion/TransitionLink";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "@/lib/servicesNav";
import { site } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [tight, setTight] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const anchorRef = useRef<string | null>(null);
  const hoveringRef = useRef(false);

  // Slide the highlight pill under a nav link (or hide it).
  const moveIndicator = useCallback((link: HTMLElement | null) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    nav.querySelectorAll<HTMLElement>("a").forEach((a) => {
      a.style.color = a === link ? "var(--chrome-accent-ink)" : "var(--chrome-ink)";
    });
    if (!link) {
      indicator.style.opacity = "0";
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = link.getBoundingClientRect();
    indicator.style.opacity = "1";
    indicator.style.width = `${box.width}px`;
    indicator.style.transform = `translateX(${box.left - navBox.left}px)`;
  }, []);

  // Back to the section currently on screen (home page only).
  const showCurrent = useCallback(() => {
    hoveringRef.current = false;
    const nav = navRef.current;
    const anchor = isHome ? anchorRef.current : null;
    moveIndicator(nav && anchor ? nav.querySelector<HTMLElement>(`a[data-target="${anchor}"]`) : null);
  }, [isHome, moveIndicator]);

  // Scroll-driven chrome: tighter capsule, reading progress, current section.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      setTight(y > 80);

      const progress = progressRef.current;
      if (progress) {
        const max = document.documentElement.scrollHeight - vh;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      }

      if (isHome) {
        let current: string | null = null;
        document.querySelectorAll<HTMLElement>("[data-anchor]").forEach((section) => {
          if (section.getBoundingClientRect().top < vh * 0.45) current = section.dataset.anchor ?? null;
        });
        if (current === "process") current = "pricing";
        if (current !== anchorRef.current) {
          anchorRef.current = current;
          if (!hoveringRef.current) showCurrent();
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    anchorRef.current = null;
    update();
    showCurrent();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, showCurrent]);

  // The capsule animates its width; re-measure the highlight once it settles.
  useEffect(() => {
    const t = window.setTimeout(showCurrent, 820);
    return () => window.clearTimeout(t);
  }, [tight, showCurrent]);

  // Mumbai local time.
  useEffect(() => {
    const tick = () => {
      if (clockRef.current) {
        clockRef.current.textContent = new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex justify-center px-[clamp(12px,3vw,32px)]">
        <div
          data-drop=""
          className={`pointer-events-auto relative box-border flex w-full items-center justify-between gap-4 overflow-hidden rounded-full border border-chrome-line bg-glass px-2 text-chrome-ink shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_20px_50px_-20px_rgba(23,17,13,.5)] backdrop-blur-[20px] backdrop-saturate-[1.6] transition-[max-width,height] duration-[800ms] ease-out ${
            tight ? "h-[58px] max-w-[1020px]" : "h-16 max-w-[1200px]"
          }`}
        >
          <TransitionLink href="/" label="Jeetu Prasad" aria-label="Jeetu Prasad — home" className="group flex flex-none items-center gap-[11px]">
            <Image
              src={site.servicesIcons.icon512}
              alt=""
              width={46}
              height={46}
              priority
              className="block h-[46px] w-[46px] rounded-full bg-[#FAF6F1] transition-transform duration-[900ms] ease-out group-hover:-rotate-[24deg]"
            />
            <span className="flex flex-col leading-none">
              <span className="stretch-108 text-[15.5px] font-extrabold tracking-[-0.02em]">Jeetu Prasad</span>
              <span className="mt-[5px] text-[9px] font-bold uppercase tracking-[.22em] text-chrome-accent">
                Websites &amp; funnels
              </span>
            </span>
          </TransitionLink>

          <nav
            ref={navRef}
            aria-label="Main"
            onMouseLeave={showCurrent}
            className="relative hidden items-center gap-0.5 rounded-full bg-chrome-line p-1 wide:flex"
          >
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute bottom-1 left-0 top-1 w-0 rounded-full bg-chrome-accent opacity-0 transition-[transform,width,opacity] duration-[550ms] ease-out"
            />
            {navItems.map((item) => (
              <TransitionLink
                key={item.anchor}
                href={`/#${item.anchor}`}
                label={item.label}
                data-target={item.anchor}
                onMouseEnter={(e) => {
                  hoveringRef.current = true;
                  moveIndicator(e.currentTarget);
                }}
                className="relative z-[1] rounded-full px-[15px] py-[9px] text-[13.5px] font-semibold transition-colors duration-300"
              >
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          <div className="flex flex-none items-center gap-1.5">
            <span
              title="Mumbai local time"
              className="hidden items-center gap-2 px-2.5 text-xs font-semibold tabular-nums text-chrome-muted wide:flex"
            >
              <span className="h-[7px] w-[7px] animate-[jp-pulse_2s_linear_infinite] rounded-full bg-live" />
              BOM <span ref={clockRef} className="text-chrome-ink">--:--</span>
            </span>
            <ThemeToggle />
            <TransitionLink
              href="/contact"
              label="Free audit"
              className="hidden h-[46px] box-border items-center gap-3.5 rounded-full bg-chrome-accent pl-5 pr-[5px] text-[13.5px] font-bold text-chrome-accent-ink transition-[filter] duration-300 hover:brightness-110 wide:flex"
            >
              <span>Free audit</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-chrome-accent-ink text-chrome-accent">
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </TransitionLink>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-chrome-accent text-chrome-accent-ink wide:hidden"
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>

          <div
            ref={progressRef}
            aria-hidden="true"
            className="absolute bottom-0 left-[30px] right-[30px] h-0.5 origin-left scale-x-0 rounded-sm bg-chrome-accent"
          />
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed left-[clamp(12px,3vw,32px)] right-[clamp(12px,3vw,32px)] top-[88px] z-[49] box-border max-h-[calc(100svh-104px)] animate-[jp-menu_.55s_cubic-bezier(.16,1,.3,1)_both] overflow-auto rounded-[28px] border border-chrome-line bg-glass p-2.5 text-chrome-ink shadow-[0_30px_80px_-20px_rgba(23,17,13,.6)] backdrop-blur-[24px] backdrop-saturate-[1.6] wide:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-0.5">
            {navItems.map((item, i) => (
              <TransitionLink
                key={item.anchor}
                href={`/#${item.anchor}`}
                label={item.label}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${120 + i * 60}ms` }}
                className="stretch-110 flex animate-[jp-menu-item_.7s_cubic-bezier(.16,1,.3,1)_both] items-baseline gap-3.5 rounded-[20px] px-[18px] py-4 text-[28px] font-[750] leading-none tracking-[-0.03em] hover:bg-chrome-line"
              >
                <span className="text-[11px] font-bold text-chrome-accent">{item.num}</span>
                {item.label}
              </TransitionLink>
            ))}
          </nav>
          <TransitionLink
            href="/contact"
            label="Free audit"
            onClick={() => setMenuOpen(false)}
            className="mt-2 box-border flex h-14 items-center justify-between rounded-full bg-chrome-accent pl-[22px] pr-1.5 font-bold text-chrome-accent-ink"
          >
            <span>Get a free 3-point audit</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chrome-accent-ink text-chrome-accent">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </TransitionLink>
          {/* Quiet door for recruiters — the developer portfolio is a separate site. */}
          <a
            href="/portfolio"
            className="mt-3 flex items-center justify-center gap-1 py-2 text-xs font-medium text-chrome-muted"
          >
            Developer portfolio <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      )}
    </>
  );
}
