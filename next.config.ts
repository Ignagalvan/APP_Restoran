import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "kfovdzpashirhpxdnnod.supabase.co",
        pathname: "/storage/v1/object/public/menu-products/**",
      },
    ],
  },
};
export default nextConfig;
