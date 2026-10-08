import { Check, Filter, Globe, KeyRound, LayoutTemplate, ShieldCheck, Workflow } from "lucide-react";
import PillLink from "@/components/services/PillLink";
import SectionHeading from "@/components/services/SectionHeading";

const flagship = [
  "Business website",
  "Landing page with lead capture",
  "Follow-up and tracking set up",
  "One launch, one connected system",
];

const ladder = [
  { icon: Globe, tag: "Entry", name: "Business Website", price: "₹10k – 25k", text: "Fixed scope, fast delivery. Services, location and easy contact." },
  { icon: LayoutTemplate, tag: "Campaign", name: "Landing Page", price: "₹5k – 10k", text: "One page, one offer — for a campaign, service or event." },
  { icon: Filter, tag: "Conversion", name: "Lead Funnel", price: "₹15k – 35k", text: "Landing page, lead capture and basic follow-up and integrations." },
  { icon: Workflow, tag: "Add-on", name: "Automation", price: "from ₹10k", text: "WhatsApp, email or CRM workflows — only when the process is clear." },
];

export default function Pricing() {
  return (
    <section id="pricing" data-anchor="pricing" className="container-site pb-[clamp(64px,8vw,110px)] pt-[clamp(80px,10vw,140px)]">
      <SectionHeading
        num="04"
        label="Services & pricing"
        title="Start small. Grow into a system."
        intro="Starting ranges, so you know where you stand. Your exact price is fixed in writing after a short call."
      />

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-3.5">
        <article
          data-reveal=""
          className="row-span-2 flex flex-col gap-6 rounded-[30px] bg-ink p-[clamp(26px,3vw,36px)] text-canvas shadow-lg"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-[.14em]">Website + Funnel</span>
            <span className="rounded-full bg-inv-accent px-[11px] py-[5px] text-[10.5px] font-extrabold uppercase tracking-[.1em] text-ink">
              Flagship
            </span>
          </div>
          <div>
            <p className="stretch-108 m-0 text-[clamp(38px,3.6vw,54px)] font-[750] leading-none tracking-[-0.04em] text-inv-accent">
              ₹25k – 50k+
            </p>
            <p className="m-0 mt-3 text-base text-inv-muted">
              Website for credibility, funnel for conversion — one connected customer-acquisition system.
            </p>
          </div>
          <ul className="flex flex-col">
            {flagship.map((point) => (
              <li key={point} className="flex items-center gap-3 border-t border-inv-line py-3 text-[15px]">
                <Check size={16} aria-hidden="true" className="shrink-0 text-inv-accent" />
                {point}
              </li>
            ))}
          </ul>
          <PillLink
            href="/contact"
            label="Free audit"
            tone="mt-auto h-[54px] bg-inv-accent text-ink pl-[22px]"
            knob="!h-[42px] !w-[42px] bg-ink text-inv-accent"
          >
            Plan my system
          </PillLink>
        </article>

        {ladder.map(({ icon: Icon, ...pkg }) => (
          <article
            key={pkg.name}
            data-reveal=""
            className="card-lg flex flex-col gap-4 p-[26px] transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="icon-tile">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-muted">{pkg.tag}</span>
            </div>
            <h3 className="m-0 mt-2 text-xl font-[750] tracking-[-0.02em]">{pkg.name}</h3>
            <p className="stretch-106 m-0 text-[clamp(26px,2.2vw,32px)] font-[750] leading-none tracking-[-0.035em] text-accent">
              {pkg.price}
            </p>
            <p className="m-0 mt-auto text-[14.5px] text-muted">{pkg.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3.5">
        <div data-reveal="" className="card-soft p-6">
          <p className="m-0 text-[15px] font-bold">Pay as you see progress</p>
          <div className="mb-2.5 mt-4 flex gap-1" aria-hidden="true">
            <span data-bar="" className="h-2 flex-[3] origin-left rounded-full bg-accent" />
            <span data-bar="" className="h-2 flex-[4] origin-left rounded-full bg-ink" />
            <span data-bar="" className="h-2 flex-[3] origin-left rounded-full bg-accent" />
          </div>
          <p className="m-0 flex justify-between text-[13px] text-muted">
            <span>30% start</span>
            <span>40% halfway</span>
            <span>30% launch</span>
          </p>
        </div>
        <div data-reveal="" className="card-soft p-6">
          <p className="m-0 flex items-center gap-2.5 text-[15px] font-bold">
            <KeyRound size={17} aria-hidden="true" className="text-accent" />
            You own everything
          </p>
          <p className="m-0 mt-2.5 text-[14.5px] text-muted">
            Domain, hosting and data sit in your accounts, in your name. No lock-in.
          </p>
        </div>
        <div data-reveal="" className="card-soft p-6">
          <p className="m-0 flex items-center gap-2.5 text-[15px] font-bold">
            <ShieldCheck size={17} aria-hidden="true" className="text-accent" />
            Care &amp; optimisation
          </p>
          <p className="m-0 mt-2.5 text-[14.5px] text-muted">
            Tiered plans with fixed monthly hours and scope — agreed in writing upfront.
          </p>
        </div>
      </div>
    </section>
  );
}
