import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";

import { AppProviders } from "@/components/app-providers";

import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = { title: "Alma de Pueblo — Mesa 12", description: "Menú y experiencia de mesa de Alma de Pueblo" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f4ede3" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${geist.variable} ${cormorant.variable}`} suppressHydrationWarning><body suppressHydrationWarning><AppProviders>{children}</AppProviders></body></html>;
}
