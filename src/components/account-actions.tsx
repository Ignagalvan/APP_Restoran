"use client";

import { ArrowRight, RefreshCw, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { usePaymentFlow } from "@/components/payment-flow-context";
import { accountData } from "@/lib/account-data";
import { createPaymentDraft } from "@/lib/split-data";

export function AccountActions({ splitPath = "/split" }: { splitPath?: string }) {
  const router = useRouter();
  const { setDraft } = usePaymentFlow();
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const showMessage = (value: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setMessage(value);
    timerRef.current = window.setTimeout(() => setMessage(null), 2200);
  };

  const prepareFullPayment = () => {
    const draft = createPaymentDraft({
      account: accountData,
      mode: "full",
      selectedQuantities: {},
      people: 1,
    });

    if (!draft) {
      showMessage("No pudimos preparar el pago.");
      return;
    }

    setDraft(draft);
    router.push("/payment");
  };

  return (
    <section className="account-actions" aria-label="Acciones de la cuenta">
      <button type="button" className="account-refresh" onClick={() => showMessage("Consumo actualizado")}>
        <RefreshCw className="size-4" />
        Actualizar consumo
      </button>
      <Link href={splitPath} className="account-secondary-action">
        <Users className="size-5" />
        <span>
          <strong>Dividir cuenta</strong>
          <ArrowRight className="size-4" />
        </span>
      </Link>
      <button type="button" className="account-primary-action" onClick={prepareFullPayment}>
        <span>Pagar cuenta completa</span>
        <ArrowRight className="size-5" />
      </button>
      <p className="account-toast" role="status" aria-live="polite" data-visible={Boolean(message)}>
        {message ?? ""}
      </p>
    </section>
  );
}
