import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/fr/librairies", destination: "/parents/librairies", permanent: true },
      { source: "/fr/contact-consulting", destination: "/contact", permanent: true },
      { source: "/fr/contact-it", destination: "/contact", permanent: true },
      { source: "/programme", destination: "/refonte-v2/programme", permanent: false },
      { source: "/parents", destination: "/refonte-v2/parents-licences", permanent: false },
      { source: "/partenariats", destination: "/refonte-v2/partenariats", permanent: false },
      { source: "/qui-sommes-nous", destination: "/refonte-v2/qui-sommes-nous", permanent: false },
    ];
  },
};

export default nextConfig;
