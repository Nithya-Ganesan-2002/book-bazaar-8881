import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // For static export, we disable built-in image optimization.
    // When deploying with a server/CDN that supports Next Image, remove `unoptimized`.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
