import { Baby, Beef, ChevronRight, Coffee, Martini, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { MenuCategory, MenuCategoryAccent } from "@/lib/menu-data";
import { menuCategories } from "@/lib/menu-data";

interface MenuCategoryIndexProps {
  basePath: string;
}

const categoryImages: Record<MenuCategoryAccent, string> = {
  entradas: "/images/menu/entrada.png",
  principales: "/images/menu/principal.png",
  bebidas: "/images/menu/bebida.png",
  ninos: "/images/menu/principal.png",
  postres: "/images/menu/postre.png",
};

const categoryIcons = {
  entradas: Sparkles,
  principales: Beef,
  bebidas: Martini,
  ninos: Baby,
  postres: Coffee,
};

export function MenuCategoryIndex({ basePath }: MenuCategoryIndexProps) {
  return (
    <section className="menu-index px-5 pb-[max(2rem,env(safe-area-inset-bottom))]" aria-label="Categorias del menu">
      <ul className="menu-category-grid">
        {menuCategories.map((category) => (
          <li key={category.id}>
            <CategoryLink category={category} href={`${basePath}/${category.id}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function CategoryLink({ category, href }: { category: MenuCategory; href: string }) {
  const Icon = categoryIcons[category.accent];

  return (
    <Link href={href} className="menu-category-link" data-accent={category.accent}>
      <div className="menu-category-thumb">
        <Image src={categoryImages[category.accent]} alt="" fill sizes="7rem" className="object-cover" />
      </div>
      <span className="menu-category-icon"><Icon className="size-4" /></span>
      <span className="min-w-0 flex-1">
        <strong>{category.name}</strong>
        <small>{category.shortDescription}</small>
      </span>
      <ChevronRight className="size-4 text-muted-foreground/70" />
    </Link>
  );
}
