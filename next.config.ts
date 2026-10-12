import type { NextConfig } from "next";
import { menuPreviewOrigins } from "./src/lib/menu-preview-origins";

const nextConfig: NextConfig = {
  async headers() {
    const origins = menuPreviewOrigins(process.env.MENU_PREVIEW_PANEL_ORIGINS, process.env.NODE_ENV !== 'production');
    return [{ source: '/menu-preview', headers: [
      { key: 'Content-Security-Policy', value: `frame-ancestors 'self' ${origins.join(' ')}` },
      { key: 'Cache-Control', value: 'private, no-store' },
      { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
    ] }];
  },
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
