"use client";

import { ChevronRight, MessageCircleHeart, Star } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useFeedbackFlow } from "@/components/feedback-flow-context";
import { accountData } from "@/lib/account-data";
import type { PaymentResultData } from "@/lib/payment-data";

interface FeedbackHomeActionProps {
  tableLabel?: string;
  feedbackPath?: string;
}

export function FeedbackHomeAction({ tableLabel = accountData.table, feedbackPath = "/feedback" }: FeedbackHomeActionProps) {
  const { setContext } = useFeedbackFlow();
  return (
    <Button variant="glass" size="tile" className="group flex-col items-start justify-between" asChild>
      <Link href={feedbackPath} onClick={() => setContext({ restaurant: accountData.restaurant, table: tableLabel, source: "home" })}>
        <span className="flex w-full items-start justify-between"><span className="grid size-10 place-items-center rounded-2xl bg-secondary text-primary shadow-sm"><Star className="size-5" strokeWidth={1.8} /></span><ChevronRight className="size-4 text-muted-foreground/55 transition-transform group-hover:translate-x-0.5" /></span>
        <span className="w-full text-left text-sm font-semibold">Mi Experiencia</span>
      </Link>
    </Button>
  );
}

export function FeedbackPaymentAction({ result, feedbackPath = "/feedback" }: { result: PaymentResultData; feedbackPath?: string }) {
  const { setContext } = useFeedbackFlow();
  return (
    <Button asChild size="hero" className="mt-7 w-full justify-between text-primary-foreground!">
      <Link href={feedbackPath} onClick={() => setContext({ restaurant: result.restaurant, table: result.table, source: "payment", paymentOperationId: result.operationId })}>
        <span>Contanos tu experiencia</span>
        <MessageCircleHeart className="size-5" />
      </Link>
    </Button>
  );
}
