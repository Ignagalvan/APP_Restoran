import { CircleCheck, CircleDashed } from "lucide-react";

import { formatCurrency } from "@/lib/account-data";

interface SplitSummaryProps {
  amount: number;
  paidAmount: number;
  inProcessAmount: number;
  pendingAmount: number;
  progress: number;
  ready: boolean;
  statusText: string;
}

export function SplitSummary({ amount, paidAmount, inProcessAmount, pendingAmount, progress, ready, statusText }: SplitSummaryProps) {
  return (
    <section className="split-summary" data-ready={ready} aria-label="Resumen de la division">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        {ready ? <CircleCheck className="size-4 text-status" /> : <CircleDashed className="size-4" />}
        <span>{statusText}</span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-[.68rem] text-muted-foreground">Vas a pagar</p>
          <p className="mt-0.5 font-display text-3xl font-semibold leading-none">{formatCurrency(amount)}</p>
        </div>
        <div className="text-right">
          <p className="text-[.68rem] text-muted-foreground">Pendiente</p>
          <p className="mt-0.5 text-xs font-semibold">{formatCurrency(pendingAmount)}</p>
        </div>
      </div>
      <div className="split-progress" aria-label={`Cuenta pagada al ${Math.round(progress * 100)} por ciento`}>
        <span style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }} />
      </div>
      <dl className="split-collab-totals">
        <div><dt>Pagado</dt><dd>{formatCurrency(paidAmount)}</dd></div>
        <div><dt>En proceso</dt><dd>{formatCurrency(inProcessAmount)}</dd></div>
      </dl>
    </section>
  );
}
