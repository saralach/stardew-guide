import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*async redirects() {
    return [
      {
        source: '/items/',
        destination: '/Items/',
        permanent: true // Permanent redirect (HTTP 301)
      },
    ];
  },*/
  reactStrictMode: true,
};

export default nextConfig;
