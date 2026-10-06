import SectionHeading from "@/components/services/SectionHeading";

const stages = [
  { percent: "30%", title: "Before work starts", text: "Confirms the project and books your slot.", dark: false },
  { percent: "40%", title: "At the halfway review", text: "Paid once you've seen your site taking shape.", dark: true },
  { percent: "30%", title: "On final delivery", text: "Paid when your site is complete and live.", dark: false },
];

export default function Payments() {
  return (
    <section id="payments" className="border-y border-line bg-surface/60 py-16 sm:py-24">
      <div className="container-site">
        <SectionHeading eyebrow="Payments" title="Pay in three simple stages" />

        <ol className="mt-12 grid gap-10 md:grid-cols-[3fr_4fr_3fr] md:gap-3">
          {stages.map((s) => (
            <li key={s.title}>
              <span aria-hidden="true" className={`block h-2.5 rounded-full ${s.dark ? "bg-ink" : "bg-accent"}`} />
              <p className={`mt-6 text-6xl font-extrabold tracking-[-0.04em] sm:text-7xl ${s.dark ? "text-ink" : "text-accent"}`}>
                {s.percent}
              </p>
              <h3 className="mt-3 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-ink-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-2 rounded-2xl bg-inverse px-6 py-5 text-inverse-ink sm:flex-row sm:items-center sm:gap-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-soft">On a ₹20,000 project</p>
          <p className="text-base sm:text-lg">
            <strong>₹6,000</strong> to start → <strong>₹8,000</strong> at halfway → <strong>₹6,000</strong> on delivery
          </p>
        </div>
      </div>
    </section>
  );
}
