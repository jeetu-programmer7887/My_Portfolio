import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Navbar from "@/components/portfolio/Navbar";
import PageTransition from "@/components/portfolio/PageTransition";
import SmoothScroll from "@/components/portfolio/SmoothScroll";
import { personSchema, site } from "@/lib/site";
import "./portfolio.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Portfolio-side defaults. Each page sets its own title and canonical.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Developer Portfolio | Jeetu Prasad",
    template: "%s | Jeetu Prasad",
  },
  description:
    "Jeetu Prasad is a Full Stack Developer from Mumbai, India, specializing in MERN stack, Next.js, TypeScript, and AI integrations. Available for freelance projects and full-time roles.",
  keywords: [
    "Full Stack Developer Mumbai",
    "MERN Stack Developer India",
    "Next.js Developer",
    "Freelance Web Developer India",
    "React Developer Mumbai",
    "AI Web Developer",
    "Jeetu Prasad",
    "TypeScript Developer",
  ],
  authors: [{ name: "Jeetu Prasad", url: site.url }],
  creator: "Jeetu Prasad",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // --- Open Graph (Facebook, LinkedIn previews) ---
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    title: "Jeetu Prasad | Full Stack Developer · MERN & Next.js · Mumbai",
    description:
      "Full Stack Developer from Mumbai building high-performance web apps with MERN, Next.js, and AI. Open to freelance & full-time opportunities.",
  },

  // --- Twitter / X Card ---
  twitter: {
    card: "summary_large_image",
    title: "Jeetu Prasad | Full Stack Developer · Mumbai",
    description:
      "Full Stack Developer from Mumbai building high-performance web apps with MERN, Next.js, and AI. Open to freelance & full-time opportunities.",
    creator: site.socials.xHandle,
  },

  // --- Favicon ---
  icons: {
    icon: site.logo,
    shortcut: site.logo,
    apple: site.logo,
  },
};

const schemaData = {
  "@context": "https://schema.org",
  ...personSchema,
  offers: {
    "@type": "Offer",
    description: "Available for freelance projects and full-time developer roles",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="bg-void text-cream antialiased">
        <SmoothScroll>
          <PageTransition>
            <CustomCursor />
            <Navbar />
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
