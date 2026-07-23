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
  messages: string[];
}

export function SplitSummary({ amount, paidAmount, inProcessAmount, pendingAmount, progress, ready, statusText, messages }: SplitSummaryProps) {
  return (
    <section className="split-summary" data-ready={ready} aria-label="Resumen de la division">
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        {ready ? <CircleCheck className="size-4 text-status" /> : <CircleDashed className="size-4" />}
        <span>{statusText}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Vas a pagar</p>
          <p className="mt-1 font-display text-4xl font-semibold">{formatCurrency(amount)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Pendiente real</p>
          <p className="mt-1 text-sm font-semibold">{formatCurrency(pendingAmount)}</p>
        </div>
      </div>
      <div className="split-progress" aria-label={`Cuenta pagada al ${Math.round(progress * 100)} por ciento`}>
        <span style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }} />
      </div>
      <dl className="split-collab-totals">
        <div><dt>Pagado</dt><dd>{formatCurrency(paidAmount)}</dd></div>
        <div><dt>En proceso</dt><dd>{formatCurrency(inProcessAmount)}</dd></div>
      </dl>
      <ul className="mt-2 space-y-1 border-t border-foreground/8 pt-2 text-[.7rem] leading-relaxed text-muted-foreground">
        {messages.map((message) => <li key={message}>{message}</li>)}
      </ul>
    </section>
  );
}
