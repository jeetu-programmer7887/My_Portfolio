import { BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const steps = [
  { title: "Discover", text: "A short call about your goals, then a clear written quote." },
  { title: "Kick-off", text: "The 30% advance confirms your slot and we agree the plan." },
  { title: "Build & review", text: "You see real progress at the halfway review." },
  { title: "Launch", text: "Final checks, go live, and your accounts handed over." },
  { title: "Care", text: "Optional monthly or yearly plan to keep things running." },
];

export default function Process() {
  return (
    <section id="process" className="border-y border-line bg-surface/60 py-16 sm:py-24">
      <div className="container-site">
        <SectionHeading eyebrow="Process" title="How a project runs" />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map((step, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={step.title} className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${
                      last ? "bg-inverse text-inverse-ink" : "bg-accent text-accent-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {!last && <span aria-hidden="true" className="hidden h-0.5 flex-1 rounded-full bg-line lg:block" />}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex items-center gap-4 rounded-2xl bg-inverse px-6 py-5 text-inverse-ink sm:px-8">
          <BadgeCheck size={26} className="shrink-0 text-accent-soft" />
          <p className="text-base font-semibold sm:text-lg">
            You always know what&apos;s happening — and you pay as you see progress.
          </p>
        </div>
      </div>
    </section>
  );
}
