import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      /*{
        source: '/Items/:Egg',
        destination: '/Items/:Egg_(white)',
        permanent: true // Permanent redirect (HTTP 301)
      },*/
    ];
  },
  reactStrictMode: true,
};



export default nextConfig;
