import { NextResponse } from "next/server";

import { getRepository } from "@/server/storage/get-repository";

export async function GET(_request: Request, { params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = await params;
  const payment = (await getRepository().getSnapshot()).payments.find((item) => item.id === paymentId);
  if (!payment) return NextResponse.json({ error: "PAYMENT_NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ payment: { id: payment.id, status: payment.status, amount: payment.amount, reviewedAt: payment.reviewedAt } });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ paymentId: string }> }) {
  try {
    const { paymentId } = await params;
    const body = (await request.json()) as { status?: "approved" | "rejected" };
    if (body.status !== "approved" && body.status !== "rejected") {
      return NextResponse.json({ error: "INVALID_STATUS" }, { status: 400 });
    }
    const payment = await getRepository().reviewPayment({ paymentId, status: body.status });
    return NextResponse.json({ payment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "REVIEW_FAILED";
    return NextResponse.json({ error: message }, { status: message === "PAYMENT_NOT_FOUND" ? 404 : 400 });
  }
}
