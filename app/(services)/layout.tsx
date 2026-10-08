import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import SiteHeader from "@/components/services/SiteHeader";
import SiteFooter from "@/components/services/SiteFooter";
import SiteMotion from "@/components/services/motion/SiteMotion";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import { personSchema, site } from "@/lib/site";
import "./services.css";

// Variable Archivo with its width axis — the design uses font-stretch for headings.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "Jeetu Prasad builds websites and funnels in Mumbai — business websites that build trust, and landing pages and lead funnels that turn visitors into enquiries, bookings or sales.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Jeetu Prasad | Websites & Funnels for Businesses in Mumbai",
    template: "%s | Jeetu Prasad",
  },
  description,
  keywords: [
    "Jeetu Prasad",
    "website developer Mumbai",
    "landing page developer Mumbai",
    "sales funnel developer India",
    "lead funnel for coaches",
    "website for clinic",
    "website for dentist Mumbai",
    "website for small business",
    "white label web developer for agencies",
    "Freelance Web Developer India",
    "Next.js Developer",
    "Full Stack Developer Mumbai",
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
    title: "Jeetu Prasad | Websites & funnels that turn traffic into customers",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeetu Prasad | Websites & funnels that turn traffic into customers",
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
    { media: "(prefers-color-scheme: light)", color: "#F2EBE2" },
    { media: "(prefers-color-scheme: dark)", color: "#17110D" },
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
      name: "Jeetu Prasad — Websites & Funnels",
      description,
      url: site.url,
      email: site.email,
      telephone: "+917887783809",
      image: `${site.url}${site.portrait}`,
      logo: `${site.url}${site.servicesIcons.icon512}`,
      priceRange: "₹5,000 – ₹50,000+",
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
        "Lead funnels",
        "Website and funnel systems",
        "Marketing automation",
        "White-label websites for agencies",
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

// Runs before first paint: applies the saved theme (no light flash for dark-theme
// visitors) and turns on entrance animations unless reduced motion is preferred.
// If the app never hydrates, the animations switch off again so nothing stays hidden.
const headScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light"){d.setAttribute("data-theme",t);}}catch(e){}if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.setAttribute("data-motion","");setTimeout(function(){if(!d.hasAttribute("data-motion-ready"))d.removeAttribute("data-motion");},6000);}})();`;

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <SiteMotion>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SiteMotion>
      </body>
    </html>
  );
}
