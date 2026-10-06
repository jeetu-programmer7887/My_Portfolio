import type { Metadata } from "next";
import CtaBand from "@/components/services/CtaBand";
import Audience from "@/sections/services/Audience";
import Hero from "@/sections/services/Hero";
import Packages from "@/sections/services/Packages";
import Process from "@/sections/services/Process";
import ServiceGrid from "@/sections/services/ServiceGrid";
import WorkPreview from "@/sections/services/WorkPreview";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    url: "/",
    title: "Jeetu Prasad | Websites that bring you more customers",
    description:
      "Jeetu Prasad is a web developer in Mumbai building fast, mobile-friendly websites and web apps for shops, clinics, coaching centres and agencies — built, launched and looked after.",
  },
};

export default function ServicesHome() {
  return (
    <>
      <Hero />
      <Audience />
      <ServiceGrid />
      <WorkPreview />
      <Process />
      <Packages variant="teaser" />
      {/* id="contact" keeps old jeetuprasad.in/#contact links landing somewhere useful. */}
      <CtaBand id="contact" />
    </>
  );
}
