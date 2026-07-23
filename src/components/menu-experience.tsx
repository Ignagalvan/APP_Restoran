"use client";

import { useCallback, useEffect, useState } from "react";

import { MenuBottomSheet } from "@/components/menu-bottom-sheet";
import { MenuCategoryTabs } from "@/components/menu-category-tabs";
import { MenuItemCard } from "@/components/menu-item-card";
import { menuCategories, type MenuItem } from "@/lib/menu-data";

export function MenuExperience() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const closeSheet = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-22% 0px -58%", threshold: [0.1, 0.4, 0.7] },
    );
    menuCategories.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    document.getElementById(categoryId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="sticky top-0 z-20 border-y border-white/50 bg-background/88 px-5 py-3 backdrop-blur-xl">
        <MenuCategoryTabs categories={menuCategories} activeCategory={activeCategory} onSelect={selectCategory} />
      </div>
      <div className="relative px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-3">
        {menuCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-20 py-8" aria-labelledby={`${category.id}-title`}>
            <div className="mb-5 border-b border-foreground/10 pb-4">
              <div className="flex items-baseline justify-between gap-4"><h2 id={`${category.id}-title`} className="font-display text-3xl font-semibold tracking-[-0.025em]">{category.name}</h2><span className="text-xs font-medium text-muted-foreground">{category.items.length} opciones</span></div>
              <p className="mt-1.5 text-sm text-muted-foreground">{category.description}</p>
            </div>
            <div className="space-y-4">{category.items.map((item) => <MenuItemCard key={item.id} item={item} onSelect={setSelectedItem} />)}</div>
          </section>
        ))}
        <footer className="menu-farewell"><p className="font-display text-3xl font-semibold">Gracias por elegir Lumbre.</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Esperamos que disfrutes tu experiencia.</p></footer>
      </div>
      <MenuBottomSheet item={selectedItem} onClose={closeSheet} />
    </>
  );
}
