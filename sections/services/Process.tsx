import SectionHeading from "@/components/services/SectionHeading";

const steps = [
  { title: "Free audit", text: "A 3-point review of your current site or offer. No obligation." },
  { title: "Plan & quote", text: "Fixed scope and price in writing. 30% to book your slot." },
  { title: "Build & review", text: "See real progress at the halfway review. 40%." },
  { title: "Launch", text: "Go live, accounts handed over, baseline captured. Final 30%." },
  { title: "Measure & optimise", text: "Compare at 30/60/90 days. Optional care plan." },
];

const metrics = ["Calls", "WhatsApp clicks", "Enquiries", "Bookings", "CTA clicks", "Lead conversion"];

export default function Process() {
  return (
    <section id="process" data-anchor="process" className="container-site section-y">
      <SectionHeading
        num="06"
        label="How we work"
        title="Built, launched — then measured."
        intro="You always know what's happening, what it costs, and what it's doing for you."
      />

      <ol className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-3">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step.title} data-reveal="" className="card-lg flex flex-col gap-10 p-6">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold ${
                  last ? "bg-ink text-canvas" : "bg-accent-soft text-accent"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="m-0 text-xl font-[750] tracking-[-0.02em]">{step.title}</h3>
                <p className="m-0 mt-2 text-[14.5px] text-muted">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div data-reveal="" className="card-soft mt-3 flex flex-wrap items-center gap-x-10 gap-y-5 px-7 py-6">
        <div className="flex-[1_1_300px]">
          <p className="m-0 text-[15px] font-bold">What we&apos;ll measure</p>
          <p className="m-0 mt-1.5 text-sm text-muted">
            Baseline before launch, compared at 30, 60 and 90 days. I never guarantee revenue, leads or rankings —
            I build and measure the system.
          </p>
        </div>
        <ul className="flex flex-[1_1_360px] flex-wrap gap-1.5">
          {metrics.map((m) => (
            <li key={m} className="rounded-full border border-line bg-surface px-3 py-[7px] text-[13px] font-semibold">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
