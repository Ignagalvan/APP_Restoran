"use client";

import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

import type { FeedbackContextData } from "@/lib/feedback-data";

interface FeedbackFlowValue {
  context: FeedbackContextData | null;
  setContext: (context: FeedbackContextData) => void;
  clearContext: () => void;
}

const FeedbackFlowContext = createContext<FeedbackFlowValue | null>(null);

export function FeedbackFlowProvider({ children }: { children: ReactNode }) {
  const [context, setContextState] = useState<FeedbackContextData | null>(null);
  const value = useMemo(() => ({ context, setContext: setContextState, clearContext: () => setContextState(null) }), [context]);
  return <FeedbackFlowContext.Provider value={value}>{children}</FeedbackFlowContext.Provider>;
}

export function useFeedbackFlow() {
  const value = useContext(FeedbackFlowContext);
  if (!value) throw new Error("useFeedbackFlow must be used within FeedbackFlowProvider");
  return value;
}
