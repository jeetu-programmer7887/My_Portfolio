import PillLink from "@/components/services/PillLink";
import SectionHeading from "@/components/services/SectionHeading";

const slots = [
  { title: "Local business website", text: "Clean, fast delivery for a local service." },
  { title: "Second website, same niche", text: "Turned into a repeatable template." },
  { title: "Coach or consultant funnel", text: "Offer positioning and lead capture." },
  { title: "Funnel with tracking", text: "Measurement and follow-up built in." },
  { title: "Agency partner", text: "White-label, ongoing work." },
];

export default function Founding() {
  return (
    <section className="panel bg-ink text-canvas">
      <div className="container-site panel-y flex flex-wrap items-center gap-x-[72px] gap-y-12">
        <div className="flex-[1_1_420px]">
          <SectionHeading
            inverse
            num="05"
            label="The Founding 5"
            titleWidth="15ch"
            title={
              <>
                Five founding clients. <span className="text-inv-accent">Honest proof.</span>
              </>
            }
          />
          <p data-reveal="" className="m-0 mt-5 max-w-[480px] text-[17px] leading-[1.6] text-inv-muted [text-wrap:pretty]">
            I&apos;m building my client portfolio the honest way. Five businesses get founding rates and direct
            access to me — in exchange for real feedback and a testimonial.
          </p>
          <div data-reveal="" className="mt-7">
            <PillLink href="/contact" label="Free audit" className="!h-[50px]" knob="!h-[38px] !w-[38px] bg-accent-ink text-accent">
              Claim a founding spot
            </PillLink>
          </div>
        </div>

        <ul className="flex flex-[1_1_420px] flex-col gap-2">
          {slots.map((slot, i) => (
            <li
              key={slot.title}
              data-reveal=""
              className="flex items-center gap-4 rounded-[20px] border border-[rgba(127,110,98,.24)] bg-inv-fill px-[18px] py-4 transition-[background-color,transform] duration-[600ms] ease-out hover:translate-x-1.5 hover:bg-[rgba(127,110,98,.24)]"
            >
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-inv-accent text-[13px] font-extrabold text-ink">
                0{i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold">{slot.title}</span>
                <span className="block text-[13.5px] text-inv-muted">{slot.text}</span>
              </span>
              <span className="flex items-center gap-[7px] text-xs font-bold text-inv-muted">
                <span className="h-[7px] w-[7px] rounded-full bg-live" />
                Open
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
