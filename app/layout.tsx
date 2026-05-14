import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

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

// ✅ Enhanced Metadata with full SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://www.jeetuprasad.in"),
  title: {
    default: "Jeetu Prasad",
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
  authors: [{ name: "Jeetu Prasad", url: "https://www.jeetuprasad.in" }],
  creator: "Jeetu Prasad",

  // --- Canonical & Indexing ---
  alternates: {
    canonical: "/",
  },
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
    url: "https://www.jeetuprasad.in",
    siteName: "Jeetu Prasad Portfolio",
    title: "Jeetu Prasad | Full Stack Developer · MERN & Next.js · Mumbai",
    description:
      "Full Stack Developer from Mumbai building high-performance web apps with MERN, Next.js, and AI. Open to freelance & full-time opportunities.",
    images: [
      {
        url: "/my_portrait.png", // resolved against metadataBase
        width: 1200,
        height: 630,
        alt: "Jeetu Prasad - Full Stack Developer Mumbai",
      },
    ],
  },

  // --- Twitter / X Card ---
  twitter: {
    card: "summary_large_image",
    title: "Jeetu Prasad | Full Stack Developer · Mumbai",
    description:
      "Full Stack Developer from Mumbai building high-performance web apps with MERN, Next.js, and AI. Open to freelance & full-time opportunities.",
    images: ["/my_portrait.png"],
    creator: "@jeetu_prasad143",
  },

  // --- Favicon ---
  icons: {
    icon: "/slash.png",
    shortcut: "/slash.png",
    apple: "/slash.png",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jeetu Prasad",
  jobTitle: "Full Stack Developer",
  url: "https://www.jeetuprasad.in",
  email: "prasadjeetu760@gmail.com",
  image: "https://www.jeetuprasad.in/my_portrait.png",
  sameAs: [
    "https://www.linkedin.com/in/jeetu-prasad",
    "https://github.com/jeetu-programmer7887",
    "https://www.threads.com/@jeetu_prasad143",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "REST APIs",
    "AI Development",
    "Docker",
    "CI/CD",
  ],
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
