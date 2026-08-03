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
  const [activeSection, setActiveSection] = useState(category.sections?.[0]?.id);
  const closeSheet = useCallback(() => setSelectedItem(null), []);
  const visibleItems = activeSection ? category.items.filter((item) => item.section === activeSection) : category.items;

  return (
    <>
      <section className="menu-category-detail px-5 pb-[max(2rem,env(safe-area-inset-bottom))]" data-accent={category.accent} aria-labelledby="menu-category-title">
        <div className="menu-category-note">
          <p>{category.description}</p>
          <span>{visibleItems.length} opciones</span>
        </div>
        {category.sections?.length ? (
          <nav className="menu-section-tabs" aria-label="Secciones de la carta">
            {category.sections.map((section) => (
              <button key={section.id} type="button" className="menu-section-tab" aria-pressed={activeSection === section.id} onClick={() => setActiveSection(section.id)}>
                {section.name} <span aria-hidden="true">{section.emoji}</span>
              </button>
            ))}
          </nav>
        ) : null}
        <div className="menu-category-items">
          {visibleItems.map((item) => (
            <div key={item.id}>
              {item.heading ? <h2 className="menu-list-heading">{item.heading}</h2> : null}
              <MenuItemCard item={item} onSelect={setSelectedItem} variant={category.accent} />
            </div>
          ))}
        </div>
      </section>
      <MenuBottomSheet key={selectedItem?.id ?? "closed"} item={selectedItem} onClose={closeSheet} />
    </>
  );
}
