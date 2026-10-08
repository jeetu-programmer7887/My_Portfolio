import type { Metadata } from "next";
import CtaBand from "@/components/services/CtaBand";
import Founding from "@/sections/services/Founding";
import FunnelSteps from "@/sections/services/FunnelSteps";
import Hero from "@/sections/services/Hero";
import Lanes from "@/sections/services/Lanes";
import Marquee from "@/sections/services/Marquee";
import Pricing from "@/sections/services/Pricing";
import Process from "@/sections/services/Process";
import WorkPreview from "@/sections/services/WorkPreview";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    url: "/",
    title: "Jeetu Prasad | Websites & funnels that turn traffic into customers",
    description:
      "Jeetu Prasad builds websites and funnels in Mumbai — business websites that build trust, and landing pages and lead funnels that turn visitors into enquiries, bookings or sales.",
  },
};

export default function ServicesHome() {
  return (
    <>
      <Hero />
      <Marquee />
      <FunnelSteps />
      <Lanes />
      <WorkPreview />
      <Pricing />
      <Founding />
      <Process />
      {/* id="contact" keeps old jeetuprasad.in/#contact links landing somewhere useful. */}
      <CtaBand id="contact" />
    </>
  );
}
