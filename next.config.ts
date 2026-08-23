import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/demo", destination: "/parcours", permanent: false },
      { source: "/demo/test-niveau", destination: "/test-niveau", permanent: false },
      { source: "/demo/parcours", destination: "/parcours", permanent: false },
      { source: "/demo/progression", destination: "/progression", permanent: false },
      { source: "/demo/module/:slug", destination: "/module/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
