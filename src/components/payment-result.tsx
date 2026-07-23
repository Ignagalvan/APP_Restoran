import { Check } from "lucide-react";

import { FeedbackPaymentAction } from "@/components/feedback-entry-actions";
import { formatCurrency } from "@/lib/account-data";
import { paymentMethods, type PaymentResultData } from "@/lib/payment-data";

export function PaymentResult({ result, feedbackPath = "/feedback" }: { result: PaymentResultData; feedbackPath?: string }) {
  const method = paymentMethods.find((candidate) => candidate.id === result.methodId);
  return (
    <section className="payment-result" aria-labelledby="payment-result-title" tabIndex={-1}>
      <div className="payment-success-mark"><Check className="size-7" /></div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-status">Pago simulado</p>
      <h2 id="payment-result-title" className="mt-2 font-display text-4xl font-semibold">Todo listo</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">La simulación se completó correctamente. No se realizó ningún cobro.</p>
      <p className="mt-6 font-display text-5xl font-semibold">{formatCurrency(result.totalAmount)}</p>
      <div className="mt-6 grid gap-2 border-y border-foreground/8 py-4 text-xs"><p className="flex justify-between"><span className="text-muted-foreground">Método</span><strong>{method?.name}</strong></p><p className="flex justify-between"><span className="text-muted-foreground">Operación</span><strong>{result.operationId}</strong></p></div>
      <FeedbackPaymentAction result={result} feedbackPath={feedbackPath} />
    </section>
  );
}
