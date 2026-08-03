import type { Metadata } from "next";

import { MenuPage } from "@/components/menu-page";

export const metadata: Metadata = {
  title: "Nuestra carta — Alma de Pueblo",
  description: "Menú digital de Alma de Pueblo",
};

export default function DigitalMenuPage() {
  return <MenuPage />;
}
