"use client";

import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

import type { PaymentDraft } from "@/lib/split-data";

interface PaymentFlowValue {
  draft: PaymentDraft | null;
  setDraft: (draft: PaymentDraft) => void;
  clearDraft: () => void;
}

const PaymentFlowContext = createContext<PaymentFlowValue | null>(null);

export function PaymentFlowProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<PaymentDraft | null>(null);
  const value = useMemo(() => ({ draft, setDraft: setDraftState, clearDraft: () => setDraftState(null) }), [draft]);
  return <PaymentFlowContext.Provider value={value}>{children}</PaymentFlowContext.Provider>;
}

export function usePaymentFlow() {
  const value = useContext(PaymentFlowContext);
  if (!value) throw new Error("usePaymentFlow must be used within PaymentFlowProvider");
  return value;
}
