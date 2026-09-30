import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allows the Next.js dev client to connect when the site is opened from another
  // device on the local network (for example, 192.168.0.135:3000).
  allowedDevOrigins: ["192.168.0.135", "localhost", "127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
