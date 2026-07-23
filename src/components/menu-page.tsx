import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { MenuExperience } from "@/components/menu-experience";

interface MenuPageProps {
  tableLabel?: string;
  homePath?: string;
}

export function MenuPage({ tableLabel = "Mesa 12", homePath = "/" }: MenuPageProps) {
  return (
    <main className="menu-page relative mx-auto min-h-svh w-full max-w-md overflow-hidden bg-background text-foreground sm:my-8 sm:min-h-[calc(100svh-4rem)] sm:rounded-[2.25rem] sm:border sm:border-white/50 sm:shadow-[0_35px_100px_-45px_var(--shadow-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-glow-primary blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.03]" />
      </div>

      <header className="menu-hero relative overflow-hidden px-5 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <Image src="/images/menu/entrada.png" alt="Burrata ahumada de Lumbre" fill priority sizes="(max-width: 640px) 100vw, 28rem" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,19,12,.24),rgba(34,19,12,.82))]" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <Link href={homePath} className="back-link back-link--dark" aria-label="Volver a la Home">
            <ArrowLeft className="size-5" strokeWidth={1.8} />
          </Link>
          <div className="table-badge table-badge--dark"><span className="size-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" />{tableLabel}</div>
        </div>

        <div className="mt-9 flex items-end justify-between gap-4">
          <div className="relative text-white">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/72"><UtensilsCrossed className="size-4" strokeWidth={1.8} />Lumbre</p>
            <h1 className="font-display text-[3.35rem] font-medium leading-[.9] tracking-[-0.045em]">Nuestra carta</h1>
          </div>
          <p className="relative pb-1 text-right text-xs leading-relaxed text-white/72">Sabores de estación<br />hechos en casa</p>
        </div>
      </header>

      <MenuExperience />
    </main>
  );
}
