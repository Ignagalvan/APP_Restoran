import type { Metadata } from "next";

import { MenuPage } from "@/components/menu-page";
import { getMenuCategories } from "@/lib/remote-menu";

export const metadata: Metadata = {
  title: "Nuestra carta — Alma de Pueblo",
  description: "Menú digital de Alma de Pueblo",
};

export default async function DigitalMenuPage() {
  const categories = await getMenuCategories();
  return <MenuPage categories={categories} />;
}
