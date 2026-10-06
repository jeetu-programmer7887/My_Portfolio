import type { Metadata } from "next";
import ScrollVideo from "@/components/portfolio/ScrollVide";
import About from "@/sections/portfolio/About";
import Contact from "@/sections/portfolio/Contact";
import Footer from "@/sections/portfolio/Footer";
import Hero from "@/sections/portfolio/Hero";
import Projects from "@/sections/portfolio/Projects";
import Skills from "@/sections/portfolio/Skills";

export const metadata: Metadata = {
  title: { absolute: "Jeetu Prasad | Full Stack Developer Portfolio · MERN & Next.js" },
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    url: "/portfolio",
    title: "Jeetu Prasad | Full Stack Developer · MERN & Next.js · Mumbai",
    description:
      "Full Stack Developer from Mumbai building high-performance web apps with MERN, Next.js, and AI. Open to freelance & full-time opportunities.",
  },
};

export default function PortfolioHome() {
  return (
    <main className="relative">
      <ScrollVideo/>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
