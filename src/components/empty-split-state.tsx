import { Receipt } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptySplitState({ accountPath = "/account" }: { accountPath?: string }) {
  return (
    <section className="split-empty" aria-labelledby="empty-split-title">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Receipt className="size-6" /></span>
      <h2 id="empty-split-title" className="mt-5 font-display text-3xl font-semibold">Todavía no hay nada para dividir</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cuando la mesa tenga consumos, vas a poder elegir tus unidades o dividir el total en partes iguales.</p>
      <Button variant="glass" className="mt-6" asChild><Link href={accountPath}>Volver al consumo</Link></Button>
    </section>
  );
}
