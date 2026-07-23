import type { MenuCategory } from "@/lib/menu-data";

interface MenuCategoryTabsProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export function MenuCategoryTabs({ categories, activeCategory, onSelect }: MenuCategoryTabsProps) {
  return (
    <nav className="menu-tabs" aria-label="Categorías del menú">
      {categories.map((category) => (
        <button key={category.id} type="button" onClick={() => onSelect(category.id)} className="menu-tab" aria-current={activeCategory === category.id ? "true" : undefined}>
          {category.name}
        </button>
      ))}
    </nav>
  );
}
