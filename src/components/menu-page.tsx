import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { MenuCategoryIndex } from "@/components/menu-category-index";

interface MenuPageProps {
  tableLabel?: string;
  homePath?: string;
  menuPath?: string;
}

export function MenuPage({ tableLabel = "Mesa 12", homePath = "/", menuPath = "/menu" }: MenuPageProps) {
  return (
    <main className="menu-page relative mx-auto min-h-svh w-full max-w-md overflow-hidden bg-background text-foreground sm:my-8 sm:min-h-[calc(100svh-4rem)] sm:rounded-[2.25rem] sm:border sm:border-white/50 sm:shadow-[0_35px_100px_-45px_var(--shadow-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-24 size-64 rounded-full bg-glow-primary blur-3xl" />
        <div className="absolute -left-32 top-12 size-60 rounded-full bg-glow-gold blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.03]" />
      </div>

      <header className="relative px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <Link href={homePath} className="back-link" aria-label="Volver a la Home">
            <ArrowLeft className="size-5" strokeWidth={1.8} />
          </Link>
          <div className="table-badge"><span className="size-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" />{tableLabel}</div>
        </div>
        <div className="mt-7">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary"><UtensilsCrossed className="size-4" strokeWidth={1.8} />Lumbre</p>
          <h1 className="font-display text-[3rem] font-semibold leading-[.9] tracking-[-0.04em]">Que queres ver?</h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Elegi una categoria y mira solo lo que te interesa.</p>
        </div>
      </header>

      <MenuCategoryIndex basePath={menuPath} />
    </main>
  );
}
