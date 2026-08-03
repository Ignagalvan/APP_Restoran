import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";
import type { CreatePaymentInput } from "@/server/storage/repository";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as CreatePaymentInput;
    if (input.provider === "bank_transfer") {
      const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!input.proofDataUrl || !input.proofMimeType || !input.proofFileName || !allowed.includes(input.proofMimeType)) {
        return NextResponse.json({ error: "INVALID_PROOF" }, { status: 400 });
      }
      if (input.proofDataUrl.length > 7_000_000) {
        return NextResponse.json({ error: "PROOF_TOO_LARGE" }, { status: 413 });
      }
      input.status = "pending";
      input.method = "bank_transfer";
    }
    const payment = await getRepository().createPayment(input);
    return NextResponse.json({ payment }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "PAYMENT_FAILED";
    const status = message === "ACCOUNT_NOT_FOUND" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
