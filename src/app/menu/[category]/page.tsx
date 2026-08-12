import type { Metadata } from "next";

import { MenuCategoryPage } from "@/components/menu-category-page";
import { getMenuCategories } from "@/lib/remote-menu";

export const metadata: Metadata = { title: "Categoría del menú — Alma de Pueblo", description: "Categoría de la carta digital de Alma de Pueblo" };

export default async function MenuCategoryRoute({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categories = await getMenuCategories();
  return <MenuCategoryPage categoryId={category} categories={categories} />;
}
