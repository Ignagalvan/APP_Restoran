"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";

import { PaymentMethodSelector } from "@/components/payment-method-selector";
import { PaymentSummary } from "@/components/payment-summary";
import { PaymentUnavailableState } from "@/components/payment-unavailable-state";
import { TipSelector } from "@/components/tip-selector";
import { Button } from "@/components/ui/button";
import { usePaymentFlow } from "@/components/payment-flow-context";
import { isValidPaymentDraft, type PaymentMethodId } from "@/lib/payment-data";
import { startMercadoPagoCheckout } from "@/lib/mercado-pago-checkout";
import { createTipSelection, type TipId } from "@/lib/tip-data";

type PaymentStatus = "review" | "processing" | "error";

export function PaymentExperience({ splitPath = "/split" }: { splitPath?: string; feedbackPath?: string }) {
  const { draft } = usePaymentFlow();
  const [method, setMethod] = useState<PaymentMethodId | null>(null);
  const [tip, setTip] = useState<TipId | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("review");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const confirming = useRef(false);

  const tipSelection = draft ? createTipSelection({ baseAmount: draft.amount, currency: "ARS" }, tip) : null;
  const tipAmount = tipSelection?.tipAmount ?? 0;
  const totalAmount = tipSelection?.totalAmount ?? (draft?.amount ?? 0);
  const ready = isValidPaymentDraft(draft) && method !== null && tipSelection !== null && status === "review";

  if (!isValidPaymentDraft(draft)) {
    return (
      <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <PaymentUnavailableState splitPath={splitPath} />
      </div>
    );
  }

  const confirmPayment = async () => {
    if (!ready || !method || !tipSelection || confirming.current) return;
    confirming.current = true;
    setErrorMessage(null);
    setStatus("processing");

    try {
      await startMercadoPagoCheckout({ amount: totalAmount, baseAmount: draft.amount, tipAmount });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No pudimos iniciar Mercado Pago.");
      setStatus("error");
      confirming.current = false;
    }
  };

  return (
    <div className="payment-content px-5">
      <PaymentSummary draft={draft} tipAmount={tipAmount} totalAmount={totalAmount} />
      <div className="mt-7">
        <PaymentMethodSelector
          disabled={status === "processing"}
          value={method}
          onChange={(value) => {
            setMethod(value);
            setStatus("review");
          }}
        />
      </div>
      <div className="mt-8">
        <TipSelector
          baseAmount={draft.amount}
          disabled={status === "processing"}
          value={tip}
          onChange={(value) => {
            setTip(value);
            setStatus("review");
          }}
        />
      </div>
      {status === "error" ? (
        <p className="mt-5 rounded-xl border border-primary/20 bg-primary/6 p-3 text-sm text-primary" role="alert">
          {errorMessage ?? "No pudimos abrir Mercado Pago. Revisa tus opciones e intenta nuevamente."}
        </p>
      ) : null}
      <div className="payment-sticky">
        <Button
          size="hero"
          className="w-full justify-between disabled:cursor-not-allowed disabled:bg-foreground/12 disabled:text-muted-foreground disabled:opacity-70 disabled:shadow-none"
          disabled={!ready}
          onClick={confirmPayment}
        >
          <span>{status === "processing" ? "Abriendo Mercado Pago..." : "Pagar con Mercado Pago"}</span>
          {status === "processing" ? <LoaderCircle className="size-5 animate-spin" /> : <ArrowRight className="size-5" />}
        </Button>
        <p className="mt-2 min-h-5 text-center text-xs text-muted-foreground" role="status" aria-live="polite">
          {status === "processing"
            ? "Te vamos a redirigir al checkout seguro."
            : !method
              ? "Elegi un metodo de pago."
              : tip === null
                ? "Elegi una opcion de propina."
                : "Se abrira Mercado Pago Sandbox."}
        </p>
      </div>
    </div>
  );
}
