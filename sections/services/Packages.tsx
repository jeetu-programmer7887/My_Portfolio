import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const packages = [
  {
    name: "Simple website",
    price: "₹9,999 – 19,998",
    points: ["A few pages", "Contact form", "Mobile-friendly design"],
    featured: false,
  },
  {
    name: "Small business website",
    price: "₹19,999 – 39,999",
    points: ["More pages", "Photo gallery", "Basic booking or catalogue"],
    featured: true,
  },
  {
    name: "Stores & web apps",
    price: "Custom quote",
    points: ["E-commerce stores", "Custom tools and dashboards", "Priced after a short call"],
    featured: false,
  },
];

interface PackagesProps {
  /** Teaser on the home page links to the full pricing page. */
  variant?: "teaser" | "full";
}

export default function Packages({ variant = "full" }: PackagesProps) {
  const teaser = variant === "teaser";

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Packages" title="Website packages" />
          {teaser && (
            <Link href="/services#pricing" className="link-accent shrink-0">
              Full pricing &amp; care plans <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <li
              key={pkg.name}
              className={
                pkg.featured
                  ? "rounded-2xl bg-inverse p-8 text-inverse-ink shadow-xl"
                  : "card p-8"
              }
            >
              <h3 className={`text-lg font-bold ${pkg.featured ? "" : "text-ink"}`}>{pkg.name}</h3>
              <p className={`mt-3 text-3xl font-extrabold tracking-[-0.02em] ${pkg.featured ? "text-accent-soft" : "text-accent"}`}>
                {pkg.price}
              </p>
              <hr className={`my-6 ${pkg.featured ? "border-inverse-ink/15" : "border-line"}`} />
              <ul className="space-y-3">
                {pkg.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 ${pkg.featured ? "text-inverse-muted" : "text-ink-muted"}`}
                  >
                    <Check size={18} className={`mt-0.5 shrink-0 ${pkg.featured ? "text-accent-soft" : "text-accent"}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap items-center gap-3 text-ink">
          <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-accent-ink">
            Launch offer
          </span>
          Reduced rates for the first few clients only.
        </p>
      </div>
    </section>
  );
}
