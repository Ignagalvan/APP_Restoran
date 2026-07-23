"use client";

import { useCallback, useState } from "react";

import { MenuBottomSheet } from "@/components/menu-bottom-sheet";
import { MenuItemCard } from "@/components/menu-item-card";
import type { MenuCategory, MenuItem } from "@/lib/menu-data";

interface MenuCategoryExperienceProps {
  category: MenuCategory;
}

export function MenuCategoryExperience({ category }: MenuCategoryExperienceProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const closeSheet = useCallback(() => setSelectedItem(null), []);

  return (
    <>
      <section className="menu-category-detail px-5 pb-[max(2rem,env(safe-area-inset-bottom))]" data-accent={category.accent} aria-labelledby="menu-category-title">
        <div className="menu-category-note">
          <p>{category.description}</p>
          <span>{category.items.length} opciones</span>
        </div>
        <div className="menu-category-items">
          {category.items.map((item) => <MenuItemCard key={item.id} item={item} onSelect={setSelectedItem} variant={category.accent} />)}
        </div>
      </section>
      <MenuBottomSheet item={selectedItem} onClose={closeSheet} />
    </>
  );
}
