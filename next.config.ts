import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // `permanent: true` (308) : ces chemins sont des anciennes URLs
    // définitivement remplacées par la structure /parcours/* actuelle, pas
    // des redirections temporaires — un 302/307 ferait perdre aux moteurs
    // de recherche le signal que l'URL cible fait désormais autorité.
    return [
      { source: "/demo", destination: "/parcours", permanent: true },
      { source: "/demo/test-niveau", destination: "/test-niveau", permanent: true },
      { source: "/demo/parcours", destination: "/parcours", permanent: true },
      { source: "/demo/progression", destination: "/progression", permanent: true },
      { source: "/demo/module/:slug", destination: "/parcours/module/:slug", permanent: true },
      { source: "/module/:slug", destination: "/parcours/module/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
