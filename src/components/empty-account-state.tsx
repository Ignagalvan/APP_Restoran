import { Receipt } from "lucide-react";

export function EmptyAccountState() {
  return <section className="account-card grid min-h-64 place-items-center px-8 text-center"><div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Receipt className="size-6" /></span><h2 className="mt-5 font-display text-3xl font-semibold">Todavía no hay consumos</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cuando se agreguen productos a la mesa, aparecerán en este resumen.</p></div></section>;
}
