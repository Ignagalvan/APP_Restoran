import type { Metadata } from "next";

import { MenuPage } from "@/components/menu-page";

export const metadata: Metadata = {
  title: "Nuestra carta — Lumbre",
  description: "Menú digital de Lumbre",
};

export default function DigitalMenuPage() {
  return <MenuPage />;
}
