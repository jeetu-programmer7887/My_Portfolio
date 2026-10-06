import { ChartColumn, Settings, TriangleAlert } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const points = [
  {
    icon: Settings,
    title: "Upgrades, not rebuilds",
    text: "Moving to a bigger plan is a settings change. Your data and code stay the same.",
  },
  {
    icon: ChartColumn,
    title: "Costs follow success",
    text: "Running costs rise only when your traffic and data do — a sign you're growing.",
  },
  {
    icon: TriangleAlert,
    title: "Warned in advance",
    text: "I tell you before any limit is reached, so there are no surprise bills.",
  },
];

export default function Growth() {
  return (
    <section id="growth" className="py-16 sm:py-24">
      <div className="container-site">
        <SectionHeading eyebrow="Growth" title="Built to grow with your business" />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card p-7">
              <span className="icon-chip">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 rounded-2xl bg-inverse px-6 py-7 text-inverse-ink sm:flex-row sm:items-center sm:gap-8 sm:px-10">
          <p className="text-5xl font-extrabold tracking-[-0.04em] text-accent-soft">$30–50</p>
          <p className="text-base sm:text-lg">
            a month, all in, is a rough guide for a busy site at full scale — plus the small yearly domain fee.
          </p>
        </div>
      </div>
    </section>
  );
}
