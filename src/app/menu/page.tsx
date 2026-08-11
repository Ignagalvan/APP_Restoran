import type { Metadata } from "next";

import { MenuPage } from "@/components/menu-page";
import { getRemoteMenuCategories } from "@/lib/remote-menu";

export const metadata: Metadata = {
  title: "Nuestra carta — Alma de Pueblo",
  description: "Menú digital de Alma de Pueblo",
};

export default async function DigitalMenuPage() {
  return <MenuPage categories={await getRemoteMenuCategories()} />;
}
