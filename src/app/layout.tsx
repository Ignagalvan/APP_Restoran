import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";

import { AppProviders } from "@/components/app-providers";

import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = { title: "Lumbre — Mesa 12", description: "Home del comensal de Restaurant OS" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4ede3" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${geist.variable} ${cormorant.variable}`} suppressHydrationWarning><body suppressHydrationWarning><AppProviders>{children}</AppProviders></body></html>;
}
