import { CircleCheck } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const plans = [
  {
    name: "Monthly plan",
    price: "₹499 – 999",
    unit: "per month",
    text: "Keeping your site live, text edits, photo swaps, broken links and minor tweaks — about 3–5 hours a month.",
    featured: false,
  },
  {
    name: "Yearly plan",
    price: "₹4,999 – 9,999",
    unit: "per year",
    text: "Everything in the monthly plan, paid upfront with a small discount.",
    featured: true,
  },
  {
    name: "New work",
    price: "Quoted per job",
    unit: "agreed before work begins",
    text: "New pages, new features, booking systems or extra storage.",
    featured: false,
  },
];

export default function CarePlans() {
  return (
    <section id="care-plans" className="py-16 sm:py-24">
      <div className="container-site">
        <SectionHeading eyebrow="After launch" title="Care plans to keep you running" />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={plan.featured ? "rounded-2xl bg-inverse p-8 text-inverse-ink shadow-xl" : "card p-8"}
            >
              <h3 className={`text-lg font-bold ${plan.featured ? "" : "text-ink"}`}>{plan.name}</h3>
              <p className={`mt-3 text-3xl font-extrabold tracking-[-0.02em] ${plan.featured ? "text-accent-soft" : "text-accent"}`}>
                {plan.price}
              </p>
              <p className={`mt-1 text-sm font-semibold ${plan.featured ? "text-inverse-muted" : "text-ink-muted"}`}>
                {plan.unit}
              </p>
              <hr className={`my-6 ${plan.featured ? "border-inverse-ink/15" : "border-line"}`} />
              <p className={`leading-relaxed ${plan.featured ? "text-inverse-muted" : "text-ink-muted"}`}>{plan.text}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex items-center gap-3 text-ink">
          <CircleCheck size={20} className="shrink-0 text-accent" />
          What each plan covers is agreed in writing upfront — no surprises.
        </p>
      </div>
    </section>
  );
}
