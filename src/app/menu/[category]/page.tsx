import type { Metadata } from "next";

import { MenuCategoryPage } from "@/components/menu-category-page";

export const metadata: Metadata = { title: "Categoria del menu - Alma de Pueblo", description: "Categoria de la carta digital de Alma de Pueblo" };

export default async function MenuCategoryRoute({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <MenuCategoryPage categoryId={category} />;
}
