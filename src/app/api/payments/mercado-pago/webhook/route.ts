import { NextResponse } from "next/server";
import { getMercadoPagoProvider } from "@/server/payments/get-payment-provider";
import { getRepository } from "@/server/storage/get-repository";

type MercadoPagoWebhookBody = {
  type?: string;
  action?: string;
  data?: {
    id?: string;
  };
};

function getPaymentIdFromUrl(request: Request) {
  const url = new URL(request.url);
  return url.searchParams.get("data.id") ?? url.searchParams.get("id");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as MercadoPagoWebhookBody;
    const paymentId = body.data?.id ?? getPaymentIdFromUrl(request);

    if (!paymentId) {
      return NextResponse.json({ error: "PAYMENT_ID_REQUIRED" }, { status: 400 });
    }

    const providerPayment = await getMercadoPagoProvider().getPayment(paymentId);
    const repository = getRepository();
    const snapshot = await repository.getSnapshot();
    const pendingPayment = snapshot.payments.find(
      (payment) =>
        payment.provider === providerPayment.provider &&
        (payment.externalTransactionId === providerPayment.externalReference ||
          payment.externalTransactionId === providerPayment.externalTransactionId ||
          providerPayment.externalReference?.includes(payment.accountId)),
    );

    if (!pendingPayment) {
      return NextResponse.json({ error: "PAYMENT_NOT_FOUND" }, { status: 404 });
    }

    const updatedPayment = await repository.updateProviderPayment({
      paymentId: pendingPayment.id,
      provider: providerPayment.provider,
      externalTransactionId: providerPayment.externalTransactionId,
      status: providerPayment.status,
      method: providerPayment.method,
    });

    return NextResponse.json({ ok: true, payment: updatedPayment, providerPayment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "MERCADO_PAGO_WEBHOOK_FAILED";
    const status = message.endsWith("_NOT_CONFIGURED") ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
