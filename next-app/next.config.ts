import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify handles the server runtime automatically
  // Images: allow Google profile photos and any external source
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
