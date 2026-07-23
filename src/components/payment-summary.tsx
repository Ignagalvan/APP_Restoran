import { formatCurrency } from "@/lib/account-data";
import type { PaymentDraft } from "@/lib/split-data";

interface PaymentSummaryProps {
  draft: PaymentDraft;
  tipAmount: number;
  totalAmount: number;
}

export function PaymentSummary({ draft, tipAmount, totalAmount }: PaymentSummaryProps) {
  const summaryText =
    draft.mode === "products"
      ? null
      : draft.mode === "equal"
        ? "Una parte igual de la cuenta."
        : "Cuenta completa de la mesa.";

  return (
    <section className="payment-summary" aria-labelledby="payment-summary-title">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-primary">Resumen</p>
          <h2 id="payment-summary-title" className="mt-1 text-sm font-semibold">
            Tu pago
          </h2>
        </div>
        <span className="payment-simulation-badge">Sandbox</span>
      </div>

      {draft.mode === "products" ? (
        <ul className="mt-4 space-y-2 border-t border-foreground/8 pt-4">
          {draft.selectedProducts.map((product) => (
            <li key={product.id} className="flex justify-between gap-4 text-xs">
              <span className="text-muted-foreground">
                {product.quantity} x {product.name}
              </span>
              <strong>{formatCurrency(product.subtotal)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 border-t border-foreground/8 pt-4 text-xs text-muted-foreground">{summaryText}</p>
      )}

      <dl className="mt-4 space-y-2 border-t border-foreground/8 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Consumo</dt>
          <dd className="font-semibold">{formatCurrency(draft.amount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Propina</dt>
          <dd className="font-semibold">{formatCurrency(tipAmount)}</dd>
        </div>
        <div className="flex items-end justify-between pt-2">
          <dt className="font-semibold">Total a pagar</dt>
          <dd className="font-display text-4xl font-semibold" aria-live="polite">
            {formatCurrency(totalAmount)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
