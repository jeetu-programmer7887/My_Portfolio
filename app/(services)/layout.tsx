import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import SiteHeader from "@/components/services/SiteHeader";
import SiteFooter from "@/components/services/SiteFooter";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { personSchema, site } from "@/lib/site";
import "./services.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "Jeetu Prasad is a web developer in Mumbai building fast, mobile-friendly websites and web apps for shops, clinics, coaching centres and agencies — built, launched and looked after.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jeetu Prasad | Website Developer for Local Businesses in Mumbai",
    template: "%s | Jeetu Prasad",
  },
  description,
  keywords: [
    "Jeetu Prasad",
    "website developer Mumbai",
    "website developer for small business",
    "web designer for local business Mumbai",
    "website for clinic",
    "website for coaching centre",
    "online store developer India",
    "landing page developer",
    "Full Stack Developer Mumbai",
    "Freelance Web Developer India",
    "Next.js Developer",
    "React Developer Mumbai",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Jeetu Prasad",
    title: "Jeetu Prasad | Websites that bring you more customers",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeetu Prasad | Websites that bring you more customers",
    description,
    creator: site.socials.xHandle,
  },
  icons: {
    icon: [
      { url: site.servicesIcons.ico, sizes: "any" },
      { url: site.servicesIcons.icon32, type: "image/png", sizes: "32x32" },
      { url: site.servicesIcons.icon512, type: "image/png", sizes: "512x512" },
    ],
    shortcut: site.servicesIcons.ico,
    apple: { url: site.servicesIcons.apple, sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6F1" },
    { media: "(prefers-color-scheme: dark)", color: "#241A14" },
  ],
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...personSchema,
      worksFor: { "@id": `${site.url}/#business` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: "Jeetu Prasad — Web Development",
      description,
      url: site.url,
      email: site.email,
      telephone: "+917887783809",
      image: `${site.url}${site.portrait}`,
      logo: `${site.url}${site.servicesIcons.icon512}`,
      priceRange: "₹9,999 – ₹39,999",
      founder: { "@id": `${site.url}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      areaServed: { "@type": "City", name: "Mumbai" },
      knowsLanguage: ["en", "hi"],
      serviceType: [
        "Business websites",
        "Landing pages",
        "Online stores",
        "Custom web apps",
        "AI chatbots",
        "Website maintenance",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: "Jeetu Prasad",
      url: site.url,
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

// Runs before first paint so a returning dark-theme visitor never sees a light flash.
const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
