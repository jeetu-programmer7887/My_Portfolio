/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // Case studies moved under the developer portfolio. Permanent (308) so
      // search engines transfer the old pages' ranking to the new addresses.
      {
        source: "/projects/:slug",
        destination: "/portfolio/work/:slug",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/portfolio",
        permanent: true,
      },
      // The separate services & pricing page was folded into the home page.
      {
        source: "/services",
        destination: "/#pricing",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
