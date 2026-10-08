"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "@studio-freight/lenis";

// Services-site motion: Lenis smooth scrolling, the curtain transition between
// pages, and scroll reveals ([data-reveal] / [data-bar], styled in services.css).
// Everything here is skipped for visitors who prefer reduced motion.

interface SiteMotionApi {
  /** Go to an internal services URL — curtain transition across pages, smooth scroll within one. */
  navigate: (href: string, label?: string) => void;
}

const SiteMotionContext = createContext<SiteMotionApi>({
  navigate: (href) => {
    window.location.href = href;
  },
});

export const useSiteMotion = () => useContext(SiteMotionContext);

const EASE_IN_OUT = "cubic-bezier(.76,0,.24,1)";
const CURTAIN_IN: Keyframe[] = [
  { transform: "translateY(100%)", borderRadius: "50% 50% 0 0 / 140px 140px 0 0" },
  { transform: "translateY(0%)", borderRadius: "0 0 0 0 / 0 0 0 0" },
];
const CURTAIN_OUT: Keyframe[] = [
  { transform: "translateY(0%)", borderRadius: "0 0 0 0 / 0 0 0 0" },
  { transform: "translateY(-100%)", borderRadius: "0 0 50% 50% / 0 0 140px 140px" },
];

interface Pending {
  hash: string | null;
  curtain: boolean;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SiteMotion({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pendingRef = useRef<Pending | null>(null);
  const busyRef = useRef(false);
  const safetyRef = useRef<number>();

  // Smooth scrolling.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-motion-ready", "");
    if (prefersReducedMotion()) return;
    // The head script sets this, but pages rendered client-side (e.g. the 404) can reset it.
    root.setAttribute("data-motion", "");

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToHash = useCallback((hash: string | null, immediate = false) => {
    const target = hash ? document.getElementById(hash) : null;
    if (hash && !target) return;
    const lenis = lenisRef.current;
    if (lenis) {
      // "how" is a pinned section, so it lines up flush with the top.
      lenis.scrollTo(target ?? 0, { offset: hash === "how" ? 0 : -20, duration: 1.4, immediate, force: true });
    } else if (target) {
      target.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
    }
  }, []);

  // Scroll reveals: hide each element (via CSS) until it enters the viewport;
  // siblings are staggered by 70ms.
  const setupReveals = useCallback(() => {
    if (!ioRef.current) {
      ioRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            ioRef.current?.unobserve(el);
            el.setAttribute("data-in", "");
            const delay = parseInt(el.style.getPropertyValue("--rd"), 10) || 0;
            window.setTimeout(() => el.setAttribute("data-done", ""), 1500 + delay);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );
    }
    const io = ioRef.current;
    const animate = document.documentElement.hasAttribute("data-motion");

    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-rv]),[data-bar]:not([data-rv])").forEach((el) => {
      el.setAttribute("data-rv", "");
      if (!animate) {
        el.setAttribute("data-in", "");
        el.setAttribute("data-done", "");
        return;
      }
      if (el.hasAttribute("data-reveal") && el.parentElement) {
        const siblings = Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal"));
        el.style.setProperty("--rd", `${Math.min(Math.max(0, siblings.indexOf(el)), 6) * 70}ms`);
      }
      io.observe(el);
    });
  }, []);

  useEffect(() => () => ioRef.current?.disconnect(), []);

  // Runs once the new page has rendered (and on first load / back-forward).
  useEffect(() => {
    const pending = pendingRef.current;
    pendingRef.current = null;

    if (!pending) {
      setupReveals();
      return;
    }

    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      setupReveals();
      const curtain = curtainRef.current;
      const finish = () => {
        busyRef.current = false;
        window.clearTimeout(safetyRef.current);
      };
      if (pending.curtain && curtain) {
        curtain
          .animate(CURTAIN_OUT, { duration: 750, delay: 120, easing: EASE_IN_OUT, fill: "forwards" })
          .finished.then(finish, finish);
      } else {
        finish();
      }
      if (pending.hash) window.setTimeout(() => scrollToHash(pending.hash), 450);
    });
  }, [pathname, scrollToHash, setupReveals]);

  const navigate = useCallback(
    (href: string, label = "Jeetu Prasad") => {
      const url = new URL(href, window.location.href);
      const hash = url.hash ? decodeURIComponent(url.hash.slice(1)) : null;

      if (url.pathname === window.location.pathname) {
        scrollToHash(hash);
        return;
      }
      if (busyRef.current) return;

      const target = url.pathname + url.search + url.hash;
      const curtain = curtainRef.current;
      if (prefersReducedMotion() || !curtain) {
        pendingRef.current = { hash, curtain: false };
        router.push(target, { scroll: false });
        return;
      }

      busyRef.current = true;
      if (labelRef.current) labelRef.current.textContent = label;
      curtain.animate(CURTAIN_IN, { duration: 650, easing: EASE_IN_OUT, fill: "forwards" }).finished.then(() => {
        pendingRef.current = { hash, curtain: true };
        router.push(target, { scroll: false });
      });

      // If the navigation never completes, don't leave the page covered.
      window.clearTimeout(safetyRef.current);
      safetyRef.current = window.setTimeout(() => {
        if (!busyRef.current) return;
        busyRef.current = false;
        pendingRef.current = null;
        curtain.animate(CURTAIN_OUT, { duration: 750, easing: EASE_IN_OUT, fill: "forwards" });
      }, 6000);
    },
    [router, scrollToHash],
  );

  const api = useMemo(() => ({ navigate }), [navigate]);

  return (
    <SiteMotionContext.Provider value={api}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] box-border flex translate-y-full items-end bg-foot p-[clamp(20px,4vw,56px)] text-foot-ink"
      >
        <span
          ref={labelRef}
          className="stretch-115 text-[clamp(44px,7vw,112px)] font-extrabold leading-[0.9] tracking-[-0.04em]"
        >
          Jeetu Prasad
        </span>
      </div>
    </SiteMotionContext.Provider>
  );
}
