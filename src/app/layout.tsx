import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Playfair_Display } from "next/font/google";

import { AppProviders } from "@/components/app-providers";

import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["600", "700", "800"] });

export const metadata: Metadata = { title: "Alma de Pueblo - Mesa 12", description: "Home del comensal de Restaurant OS" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5efe3" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${geist.variable} ${cormorant.variable} ${playfair.variable}`} suppressHydrationWarning><body suppressHydrationWarning><AppProviders>{children}</AppProviders></body></html>;
}
