import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const shortcuts = [
  { label: "Services & pricing", href: "/services" },
  { label: "Projects I've built", href: "/#work" },
  { label: "Get a quote", href: "/contact" },
];

export default function NotFoundContent() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site max-w-3xl text-center">
        <p className="text-8xl font-extrabold tracking-[-0.05em] text-accent sm:text-9xl">404</p>
        <h1 className="heading-lg mt-6 text-ink">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
          The link may be old or mistyped. Here are a few places that will help instead.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary !px-7 !py-3.5">
            <ArrowLeft size={18} /> Back to home
          </Link>
        </div>

        <ul className="mx-auto mt-12 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {shortcuts.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="card group flex h-full items-center justify-between gap-3 p-5 font-bold text-ink transition-colors hover:border-accent/50"
              >
                {s.label}
                <ArrowRight size={16} className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
