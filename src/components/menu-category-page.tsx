import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MenuCategoryExperience } from "@/components/menu-category-experience";
import { getMenuCategoryById, type MenuCategoryAccent } from "@/lib/menu-data";

interface MenuCategoryPageProps {
  categoryId: string;
  tableLabel?: string;
  menuPath?: string;
}

const categoryImages: Record<MenuCategoryAccent, string> = {
  entradas: "/images/menu/entrada.png",
  principales: "/images/menu/principal.png",
  bebidas: "/images/menu/bebida.png",
  ninos: "/images/menu/principal.png",
  postres: "/images/menu/postre.png",
};

export function MenuCategoryPage({ categoryId, tableLabel = "Mesa 12", menuPath = "/menu" }: MenuCategoryPageProps) {
  const category = getMenuCategoryById(categoryId);
  if (!category) notFound();

  return (
    <main className="menu-page relative mx-auto min-h-svh w-full max-w-md overflow-hidden bg-background text-foreground sm:my-8 sm:min-h-[calc(100svh-4rem)] sm:rounded-[2.25rem] sm:border sm:border-white/50 sm:shadow-[0_35px_100px_-45px_var(--shadow-ink)]">
      <header className="menu-category-hero" data-accent={category.accent}>
        <Image src={categoryImages[category.accent]} alt="" fill priority sizes="(max-width: 640px) 100vw, 28rem" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,19,12,.18),rgba(34,19,12,.76))]" aria-hidden="true" />
        <div className="relative flex items-center justify-between">
          <Link href={menuPath} className="back-link back-link--dark" aria-label="Volver a categorias">
            <ArrowLeft className="size-5" strokeWidth={1.8} />
          </Link>
          <div className="table-badge table-badge--dark"><span className="size-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" />{tableLabel}</div>
        </div>
        <div className="relative mt-auto">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-white/70">Carta</p>
          <h1 id="menu-category-title" className="font-display text-[3.25rem] font-semibold leading-[.9] tracking-[-.045em] text-white">{category.name}</h1>
        </div>
      </header>
      <MenuCategoryExperience category={category} />
    </main>
  );
}
