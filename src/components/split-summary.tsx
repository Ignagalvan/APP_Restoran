import { CircleCheck, CircleDashed } from "lucide-react";

import { formatCurrency } from "@/lib/account-data";

interface SplitSummaryProps {
  amount: number;
  unassignedBalance: number;
  ready: boolean;
  statusText: string;
}

export function SplitSummary({ amount, unassignedBalance, ready, statusText }: SplitSummaryProps) {
  return (
    <section className="split-summary" data-ready={ready} aria-label="Resumen de la división">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">{ready ? <CircleCheck className="size-4 text-status" /> : <CircleDashed className="size-4" />}<span>{statusText}</span></div>
      <div className="mt-3 flex items-end justify-between gap-4"><div><p className="text-xs text-muted-foreground">Vas a pagar</p><p className="mt-1 font-display text-4xl font-semibold">{formatCurrency(amount)}</p></div><div className="text-right"><p className="text-xs text-muted-foreground">Queda por pagar</p><p className="mt-1 text-sm font-semibold">{formatCurrency(unassignedBalance)}</p></div></div>
      <p className="mt-2 border-t border-foreground/8 pt-2 text-[.7rem] leading-relaxed text-muted-foreground">Este importe podrá abonarlo otra persona.</p>
    </section>
  );
}
