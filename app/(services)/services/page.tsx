import type { Metadata } from "next";
import CtaBand from "@/components/services/CtaBand";
import CarePlans from "@/sections/services/CarePlans";
import Growth from "@/sections/services/Growth";
import Ownership from "@/sections/services/Ownership";
import Packages from "@/sections/services/Packages";
import Payments from "@/sections/services/Payments";
import ServiceGrid from "@/sections/services/ServiceGrid";

const description =
  "Website packages from ₹9,999, simple 30-40-30 payments, affordable care plans and full ownership of your website. Web development for local businesses in Mumbai by Jeetu Prasad.";

export const metadata: Metadata = {
  title: "Services & Pricing — Websites for Local Businesses",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    url: "/services",
    title: "Services & Pricing | Jeetu Prasad",
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pb-4 pt-12 sm:pt-20">
        <div className="container-site max-w-3xl animate-fade-up">
          <p className="eyebrow">Services &amp; pricing</p>
          <h1 className="heading-xl mt-6 text-ink">
            Clear prices. <span className="text-accent">No surprises.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
            Everything you need to know before we start: what I build, what it costs, how you pay and
            what happens after launch.
          </p>
        </div>
      </section>
      <ServiceGrid showLink={false} />
      <Packages />
      <Payments />
      <CarePlans />
      <Ownership />
      <Growth />
      <CtaBand />
    </>
  );
}
