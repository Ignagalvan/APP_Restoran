export type StartMercadoPagoCheckoutInput = {
  accountId?: string;
  amount: number;
  baseAmount?: number;
  tipAmount?: number;
  payerEmail?: string;
};

export async function startMercadoPagoCheckout({
  accountId = "acc_lumbre_12_active",
  amount,
  baseAmount,
  tipAmount = 0,
  payerEmail = "test_user_123@testuser.com",
}: StartMercadoPagoCheckoutInput) {
  const response = await fetch("/api/payments/mercado-pago/preference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId, amount, baseAmount: baseAmount ?? amount - tipAmount, tipAmount, payerEmail }),
  });
  const data = (await response.json()) as {
    preference?: { sandboxInitPoint?: string; initPoint?: string };
    error?: string;
  };

  if (!response.ok || !data.preference) {
    throw new Error(data.error ?? "No pudimos iniciar Mercado Pago.");
  }

  const checkoutUrl = data.preference.sandboxInitPoint ?? data.preference.initPoint;

  if (!checkoutUrl) {
    throw new Error("Mercado Pago no devolvio una URL de checkout.");
  }

  window.location.href = checkoutUrl;
}
