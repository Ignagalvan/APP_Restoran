"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { usePaymentFlow } from "@/components/payment-flow-context";

interface PaymentBackLinkProps {
  accountPath: string;
  splitPath: string;
}

export function PaymentBackLink({ accountPath, splitPath }: PaymentBackLinkProps) {
  const { draft } = usePaymentFlow();
  const href = draft?.mode === "full" ? accountPath : splitPath;
  const label = draft?.mode === "full" ? "Volver a la cuenta" : "Volver a dividir la cuenta";

  return (
    <Link href={href} className="back-link" aria-label={label}>
      <ArrowLeft className="size-5" />
    </Link>
  );
}
