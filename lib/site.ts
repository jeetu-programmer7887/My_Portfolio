// Single source of truth for identity and contact details, shared by the
// services site (/) and the developer portfolio (/portfolio).

export const site = {
  name: "Jeetu Prasad",
  url: "https://www.jeetuprasad.in",
  email: "jprasad9356@gmail.com",
  phoneDisplay: "+91 78877 83809",
  phoneHref: "tel:+917887783809",
  whatsappHref: "https://wa.me/917887783809",
  location: "Mumbai, India",
  portrait: "/my_portrait.png",
  logo: "/jp_logo.png", // portfolio favicon
  // Services-site (default) favicon set, generated from /services_logo.png.
  servicesIcons: {
    icon32: "/services-icon-32.png",
    icon512: "/services-icon-512.png",
    apple: "/services-apple-icon.png",
    ico: "/favicon.ico",
  },
  socials: {
    github: "https://github.com/jeetu-programmer7887",
    linkedin: "https://www.linkedin.com/in/jeetu-prasad",
    x: "https://x.com/jeetu_prasad78",
    xHandle: "@jeetu_prasad78",
  },
} as const;

/** Prefilled WhatsApp chat link. */
export function whatsappLink(message = "Hi Jeetu, I'd like to discuss a website for my business.") {
  return `${site.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/** schema.org Person — kept identical on both sides so the name ranking stays anchored. */
export const personSchema = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  jobTitle: "Full Stack Developer",
  url: site.url,
  email: site.email,
  telephone: "+917887783809",
  image: `${site.url}${site.portrait}`,
  sameAs: [site.socials.linkedin, site.socials.github, site.socials.x],
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
} as const;
