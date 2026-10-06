"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/services#pricing" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-canvas/90 backdrop-blur-md" : "border-transparent bg-canvas"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link href="/" className="flex flex-col leading-none" aria-label="Jeetu Prasad — home">
          <span className="text-lg font-extrabold tracking-[-0.02em] text-ink">Jeetu Prasad</span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Web development
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "bg-surface-2 text-accent" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link href="/contact" className="btn-primary !px-5 !py-2.5">
            Get a quote
          </Link>
          {/* Deliberately quiet: recruiters look for it, clients shouldn't be pulled away. */}
          <a
            href="/portfolio"
            className="ml-2 inline-flex items-center gap-1 border-l border-line pl-4 text-xs font-medium text-ink-muted transition-colors hover:text-accent"
          >
            Developer portfolio
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-surface-2"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3">
              Get a quote
            </Link>
            <a
              href="/portfolio"
              className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-medium text-ink-muted"
            >
              Developer portfolio
              <ArrowUpRight size={13} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
