import SectionHeading from "@/components/services/SectionHeading";

const costs = [
  { item: "Domain name", detail: ".com or .in", start: "~₹800–2,000 / year", grow: "Stays about the same" },
  { item: "Hosting", detail: "Vercel", start: "Free tier available", grow: "Pro ~$20 / month for commercial use" },
  { item: "Database", detail: "MongoDB Atlas", start: "Free (512 MB)", grow: "~$9 / month with daily backups" },
];

export default function Ownership() {
  return (
    <section id="ownership" className="border-y border-line bg-surface/60 py-16 sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="Ownership" title="You own your website" />
          <p className="mt-6 text-lg leading-relaxed text-ink">
            Domain, hosting and database sit in <strong>your own accounts</strong>, in your name. My fee
            covers my time only.
          </p>
          <div className="mt-8 rounded-2xl bg-inverse p-6 text-inverse-ink">
            <h3 className="text-lg font-bold">Prefer not to manage it?</h3>
            <p className="mt-2 leading-relaxed text-inverse-muted">
              I can run it for you at actual cost plus a small, clearly itemised margin.
            </p>
          </div>
        </div>

        {/* min-w-0 lets the table scroll inside its card instead of widening the page on phones. */}
        <div className="min-w-0">
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">Approximate running costs</caption>
              <thead>
                <tr className="bg-accent text-accent-ink">
                  <th scope="col" className="px-5 py-4 text-sm font-bold">Running cost</th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">To start</th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold">As you grow</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((row) => (
                  <tr key={row.item} className="border-t border-line">
                    <th scope="row" className="px-5 py-4 align-top font-semibold text-ink">
                      {row.item}
                      <span className="block text-sm font-normal text-ink-muted">{row.detail}</span>
                    </th>
                    <td className="px-5 py-4 align-top text-ink">{row.start}</td>
                    <td className="px-5 py-4 align-top text-ink">{row.grow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Figures are approximate. I confirm current pricing from each provider&apos;s pricing page before
            quoting.
          </p>
        </div>
      </div>
    </section>
  );
}
