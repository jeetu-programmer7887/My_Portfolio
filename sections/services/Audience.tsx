import { GraduationCap, Megaphone, Stethoscope, Store } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";

const audiences = [
  {
    icon: Store,
    title: "Shops & stores",
    text: "Show your products, opening hours and location — or sell online.",
  },
  {
    icon: Stethoscope,
    title: "Clinics",
    text: "Help patients find you, trust you and book a visit.",
  },
  {
    icon: GraduationCap,
    title: "Coaching centres",
    text: "Share your courses and collect student enquiries.",
  },
  {
    icon: Megaphone,
    title: "Agencies & marketers",
    text: "Landing pages for your campaigns and clients, delivered on time.",
  },
];

export default function Audience() {
  return (
    <section className="border-y border-line bg-surface/60 py-16 sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="Who I work with"
          title="Built for local businesses"
          intro="Shops, clinics, coaching centres and agencies around Mumbai that want a professional website that brings in real enquiries."
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {audiences.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card flex gap-4 p-5">
              <span className="icon-chip">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
