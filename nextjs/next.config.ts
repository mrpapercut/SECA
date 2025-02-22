import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.edsm.net',
        port: '',
        pathname: '/img/**',
      },
    ],
    unoptimized: true,
  },

  output: 'export', // Static export
  distDir: 'dist',
};

export default nextConfig
