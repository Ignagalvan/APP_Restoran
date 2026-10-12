"use client";

import { MenuCategoryExperience } from "@/components/menu-category-experience";
import { useLiveMenuCategories } from "@/components/live-menu-index";
import type { MenuCategory } from "@/lib/menu-data";

interface LiveMenuCategoryDetailProps {
  categoryId: string;
  initialCategories: MenuCategory[];
  preview?: boolean;
}

export function LiveMenuCategoryDetail({ categoryId, initialCategories, preview = false }: LiveMenuCategoryDetailProps) {
  const categories = useLiveMenuCategories(initialCategories, !preview);
  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <section className="px-5 py-10 text-center text-sm text-muted-foreground">
        Esta categoria no tiene productos disponibles en este momento.
      </section>
    );
  }

  return <MenuCategoryExperience category={category} />;
}
