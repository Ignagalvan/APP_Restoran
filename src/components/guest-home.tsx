import { ArrowUpRight, ChevronRight, CircleDollarSign, ConciergeBell, Sparkles, Utensils } from "lucide-react";
import Link from "next/link";

import { FeedbackHomeAction } from "@/components/feedback-entry-actions";
import { Button } from "@/components/ui/button";

const restaurant = { name: "Lumbre", table: "Mesa 12", welcome: "Qué alegría recibirte." } as const;

interface GuestHomeProps {
  tableLabel?: string;
  basePath?: string;
}

export function GuestHome({ tableLabel = restaurant.table, basePath = "" }: GuestHomeProps) {
  return (
    <main className="relative mx-auto flex min-h-svh w-full max-w-md flex-col overflow-hidden bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-foreground sm:min-h-[52rem] sm:rounded-[2.25rem] sm:border sm:border-white/50 sm:shadow-[0_35px_100px_-45px_var(--shadow-ink)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-glow-primary blur-3xl" />
        <div className="absolute -left-24 top-[38%] size-64 rounded-full bg-glow-gold blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.035]" />
      </div>

      <header className="relative z-10 flex items-center justify-between">
        <div className="brand-mark" aria-label={`Logo de ${restaurant.name}`}><span>L</span></div>
        <div className="table-badge"><span className="size-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" />{tableLabel}</div>
      </header>

      <section className="relative z-10 flex flex-1 flex-col justify-center py-8" aria-labelledby="restaurant-name">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <ConciergeBell className="size-4 text-primary" strokeWidth={1.8} />Bienvenidos a
        </div>
        <h1 id="restaurant-name" className="font-display text-[clamp(4.4rem,20vw,6rem)] font-medium leading-[0.82] tracking-[-0.065em]">{restaurant.name}</h1>
        <div className="mt-6 flex items-start justify-between gap-5">
          <p className="max-w-[16rem] text-[1.05rem] leading-relaxed text-muted-foreground">{restaurant.welcome}<br />Tu mesa está lista.</p>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/8 text-primary shadow-inner">
            <Sparkles className="size-5" strokeWidth={1.7} />
          </div>
        </div>
      </section>

      <nav className="relative z-10 space-y-3" aria-label="Opciones de la mesa">
        <Button size="hero" className="group w-full justify-start gap-4" asChild>
          <Link href={`${basePath}/menu`}>
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/14 shadow-inner"><Utensils className="size-5" strokeWidth={1.8} /></span>
            <span className="flex-1 text-left"><span className="block text-[1.05rem] font-semibold">Ver Menú</span><span className="mt-0.5 block text-xs font-normal text-primary-foreground/72">Descubrí nuestra propuesta</span></span>
            <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
          </Link>
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="glass" size="tile" className="group flex-col items-start justify-between" asChild>
            <Link href={`${basePath}/account`}>
              <span className="flex w-full items-start justify-between"><span className="grid size-10 place-items-center rounded-2xl bg-secondary text-primary shadow-sm"><CircleDollarSign className="size-5" strokeWidth={1.8} /></span><ChevronRight className="size-4 text-muted-foreground/55 transition-transform group-hover:translate-x-0.5" /></span>
              <span className="w-full text-left text-sm font-semibold">Ver Consumo</span>
            </Link>
          </Button>
          <FeedbackHomeAction tableLabel={tableLabel} feedbackPath={`${basePath}/feedback`} />
        </div>
      </nav>
    </main>
  );
}
