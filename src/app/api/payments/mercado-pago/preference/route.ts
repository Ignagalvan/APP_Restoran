import { NextResponse } from "next/server";
import { getMercadoPagoProvider } from "@/server/payments/get-payment-provider";
import { getRepository } from "@/server/storage/get-repository";

type PreferenceRequestBody = {
  accountId: string;
  amount?: number;
  baseAmount?: number;
  tipAmount?: number;
  payerEmail?: string;
};

function getSafeErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    if (error && typeof error === "object") {
      const sdkError = error as {
        message?: string;
        error?: string;
        status?: number;
        cause?: Array<{ code?: string; description?: string }>;
      };
      const cause = Array.isArray(sdkError.cause)
        ? sdkError.cause
            .map((item) => [item.code, item.description].filter(Boolean).join(": "))
            .filter(Boolean)
            .join(" | ")
        : "";

      return [sdkError.message, sdkError.error, cause, sdkError.status ? `status:${sdkError.status}` : ""]
        .filter(Boolean)
        .join(" - ");
    }

    return "MERCADO_PAGO_PREFERENCE_FAILED";
  }

  const apiError = error as Error & {
    cause?: Array<{ code?: string; description?: string }>;
    status?: number;
  };
  const cause = Array.isArray(apiError.cause)
    ? apiError.cause
        .map((item) => [item.code, item.description].filter(Boolean).join(": "))
        .filter(Boolean)
        .join(" | ")
    : "";

  return cause ? `${apiError.message}: ${cause}` : apiError.message;
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as PreferenceRequestBody;
    const repository = getRepository();
    const snapshot = await repository.getSnapshot();
    const account = snapshot.accounts.find((candidate) => candidate.id === input.accountId);

    if (!account) {
      return NextResponse.json({ error: "ACCOUNT_NOT_FOUND" }, { status: 404 });
    }

    const remainingAmount = Math.max(account.total - account.paidTotal, 0);
    const amount = input.amount ?? remainingAmount;
    const baseAmount = input.baseAmount ?? amount;
    const tipAmount = input.tipAmount ?? Math.max(0, amount - baseAmount);

    if (amount <= 0 || baseAmount <= 0 || baseAmount > remainingAmount || tipAmount < 0) {
      return NextResponse.json({ error: "INVALID_PAYMENT_AMOUNT" }, { status: 400 });
    }

    const preference = await getMercadoPagoProvider().createCheckoutPreference({
      accountId: account.id,
      amount,
      payerEmail: input.payerEmail,
      description: `Restaurant OS - ${account.id}`,
    });

    const payment = await repository.createPayment({
      accountId: account.id,
      amount,
      method: "checkout_pro",
      provider: preference.provider,
      status: "pending",
      externalTransactionId: preference.preferenceId,
    });

    return NextResponse.json({ preference, payment }, { status: 201 });
  } catch (error) {
    const message = getSafeErrorMessage(error);
    const status = message.endsWith("_NOT_CONFIGURED") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
