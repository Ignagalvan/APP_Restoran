"use client";

import type { ReactNode } from "react";

import { FeedbackFlowProvider } from "@/components/feedback-flow-context";
import { PaymentFlowProvider } from "@/components/payment-flow-context";

export function AppProviders({ children }: { children: ReactNode }) {
  return <PaymentFlowProvider><FeedbackFlowProvider>{children}</FeedbackFlowProvider></PaymentFlowProvider>;
}
