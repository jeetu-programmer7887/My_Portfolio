import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/services/SectionHeading";
import { showcase } from "@/lib/showcase";

export default function WorkPreview() {
  return (
    <section id="work" className="py-16 sm:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Work"
          title="Projects I've built"
          intro="Real, working projects. Here's what each one does — and how the same ideas can help your business."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcase.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/work/${item.slug}`}
                className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                  <Image
                    src={item.image}
                    alt={`${item.name} — ${item.kind.toLowerCase()} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-accent">
                    {item.kind}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-ink">{item.name}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{item.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-accent">
                    See what it does
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
