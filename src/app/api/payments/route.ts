import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";
import type { CreatePaymentInput } from "@/server/storage/repository";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as CreatePaymentInput;
    const payment = await getRepository().createPayment(input);
    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PAYMENT_FAILED";
    const status = message === "ACCOUNT_NOT_FOUND" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
