import { ArrowRight, ArrowUpRight, Filter, Handshake, Store } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";
import TransitionLink from "@/components/services/motion/TransitionLink";

const lanes = [
  {
    icon: Store,
    lane: "Lane A · Website",
    from: "from ₹10k",
    title: "Look credible. Be easy to contact.",
    text: "A fast, professional site that shows your services, location and reviews — and makes calling or WhatsApp-ing you effortless.",
    quote: "“We need to look credible and make it easy to contact us.”",
    who: ["Dentists", "Clinics", "Salons", "Interior designers", "Local services", "Coaching centres"],
    product: "Business Website",
  },
  {
    icon: Filter,
    lane: "Lane B · Funnel",
    from: "from ₹5k",
    title: "Turn clicks into customers.",
    text: "Landing pages and lead funnels built around your offer — capture, follow-up and tracking included.",
    quote: "“We have an offer and traffic, but our conversion process is weak.”",
    who: ["Coaches", "Consultants", "Course creators", "Workshop sellers", "High-ticket services"],
    product: "Landing Page · Lead Funnel",
  },
];

export default function Lanes() {
  return (
    <section id="services" data-anchor="services" className="container-site section-y">
      <SectionHeading
        num="02"
        label="Two lanes"
        titleWidth="18ch"
        title="Credibility for local businesses. Conversion for offers."
        intro="Two clear products, two kinds of customer — no generic “we do everything” list."
      />

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-4">
        {lanes.map(({ icon: Icon, ...lane }) => (
          <TransitionLink
            key={lane.lane}
            href="/contact"
            label="Free audit"
            data-reveal=""
            className="card-lg group flex flex-col gap-7 p-[clamp(24px,3vw,36px)] transition-[transform,box-shadow] duration-700 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="caps flex items-center gap-2.5 text-xs text-accent">
                <span className="icon-tile">
                  <Icon size={19} aria-hidden="true" />
                </span>
                {lane.lane}
              </span>
              <span className="text-[13px] font-bold text-muted">{lane.from}</span>
            </div>
            <div>
              <h3 className="stretch-106 m-0 text-[clamp(26px,2.4vw,34px)] font-[750] leading-[1.08] tracking-[-0.03em]">
                {lane.title}
              </h3>
              <p className="m-0 mt-3 text-base text-muted">{lane.text}</p>
            </div>
            <blockquote className="m-0 rounded-[18px] border border-line bg-surface-2 px-[18px] py-4 text-[15px] font-semibold not-italic">
              {lane.quote}
            </blockquote>
            <div>
              <p className="caps m-0 mb-2.5 text-muted">Best for</p>
              <ul className="flex flex-wrap gap-1.5">
                {lane.who.map((w) => (
                  <li key={w} className="chip">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5">
              <span className="text-[15px] font-bold">{lane.product}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-500 ease-out group-hover:rotate-45">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
          </TransitionLink>
        ))}
      </div>

      <div
        data-reveal=""
        className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-[28px] bg-ink px-[clamp(24px,3vw,36px)] py-[clamp(22px,2.6vw,30px)] text-canvas shadow"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[rgba(127,110,98,.25)] text-inv-accent">
          <Handshake size={20} aria-hidden="true" />
        </span>
        <div className="flex-[1_1_360px]">
          <p className="m-0 text-xs font-bold uppercase tracking-[.14em] text-inv-accent">Agency partner</p>
          <p className="m-0 mt-1.5 text-lg font-[650] leading-[1.4]">
            White-label websites and funnels for social, ads, branding and SEO agencies. You keep the client — I
            build.
          </p>
        </div>
        <TransitionLink
          href="/contact"
          label="Partnership"
          className="inline-flex items-center gap-2.5 rounded-full bg-inv-accent px-5 py-[13px] font-bold text-ink transition-transform duration-500 ease-out hover:-translate-y-0.5"
        >
          Talk partnership <ArrowRight size={15} aria-hidden="true" />
        </TransitionLink>
      </div>
    </section>
  );
}
