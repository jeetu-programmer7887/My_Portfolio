import { MessageCircle } from "lucide-react";
import PillLink from "./PillLink";
import { whatsappLink } from "@/lib/site";

const auditPoints = [
  { title: "First impression", text: "Does the page earn trust in the first five seconds?" },
  { title: "Path to contact", text: "How many taps does it take to call, WhatsApp or book?" },
  { title: "Follow-up", text: "What happens after someone enquires — and how fast?" },
];

/** Closing "free 3-point audit" panel shown above the footer. */
export default function CtaBand({ id }: { id?: string }) {
  return (
    <section id={id} className="panel mb-3 overflow-hidden bg-accent text-accent-ink">
      <div className="container-site panel-y flex flex-wrap items-end gap-x-[72px] gap-y-12">
        <div className="flex-[1.2_1_460px]">
          <p className="m-0 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[.2em]">
            <span className="h-0.5 w-7 rounded-sm bg-current" />
            Free, no obligation
          </p>
          <h2
            data-reveal=""
            className="stretch-108 m-0 mt-[22px] max-w-[13ch] text-[clamp(38px,5vw,76px)] font-[750] leading-none tracking-[-0.04em]"
          >
            Get a free 3-point audit.
          </h2>
          <p data-reveal="" className="m-0 mt-5 max-w-[460px] text-[17px] leading-[1.6]">
            Send me your website or offer. Within 24 hours you get three specific, honest fixes — whether we
            work together or not.
          </p>
          <div data-reveal="" className="mt-8 flex flex-wrap gap-3">
            <PillLink href="/contact" label="Free audit" tone="bg-accent-ink text-accent" knob="bg-accent text-accent-ink">
              Request my audit
            </PillLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2.5 rounded-full border-[1.5px] border-current px-[22px] font-bold transition-transform duration-500 ease-out hover:-translate-y-0.5"
            >
              <MessageCircle size={17} aria-hidden="true" />
              WhatsApp me
            </a>
          </div>
        </div>

        <ol className="flex flex-[1_1_380px] flex-col gap-2">
          {auditPoints.map((point, i) => (
            <li
              key={point.title}
              data-reveal=""
              className="flex items-start gap-4 rounded-[22px] border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.12)] px-5 py-[18px]"
            >
              <span className="mt-0.5 text-[13px] font-extrabold opacity-75">0{i + 1}</span>
              <span>
                <span className="block text-[17px] font-bold">{point.title}</span>
                <span className="mt-0.5 block text-[14.5px] opacity-[.85]">{point.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
