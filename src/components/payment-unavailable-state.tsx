import { ReceiptText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function PaymentUnavailableState({ splitPath = "/split" }: { splitPath?: string }) {
  return (
    <section className="split-empty" aria-labelledby="payment-unavailable-title">
      <ReceiptText className="mx-auto size-7 text-primary" />
      <h2 id="payment-unavailable-title" className="mt-4 font-display text-3xl font-semibold">No hay un pago preparado</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Volvé a dividir la cuenta para elegir qué querés pagar.</p>
      <Button asChild className="mt-6 text-primary-foreground!"><Link href={splitPath}>Volver a dividir</Link></Button>
    </section>
  );
}
