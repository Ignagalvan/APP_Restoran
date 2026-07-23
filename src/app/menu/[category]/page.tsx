import type { Metadata } from "next";

import { MenuCategoryPage } from "@/components/menu-category-page";

export const metadata: Metadata = { title: "Categoria del menu - Lumbre", description: "Categoria de la carta digital de Lumbre" };

export default async function MenuCategoryRoute({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <MenuCategoryPage categoryId={category} />;
}
