import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import type { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";
import type { PaymentProvider, CheckoutPreferenceInput, ProviderPaymentResult } from "./payment-provider";

const providerName = "mercado_pago_checkout_pro";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name}_NOT_CONFIGURED`);
  }

  return value;
}

function getAccessToken() {
  const accessToken = getRequiredEnv("MERCADO_PAGO_ACCESS_TOKEN");

  if (!accessToken.startsWith("TEST-")) {
    throw new Error("MERCADO_PAGO_TEST_ACCESS_TOKEN_REQUIRED");
  }

  return accessToken;
}

function getBaseUrl() {
  return process.env.APP_BASE_URL ?? "http://localhost:3000";
}

function isLocalBaseUrl(baseUrl: string) {
  return baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1");
}

function getClient() {
  return new MercadoPagoConfig({
    accessToken: getAccessToken(),
    options: { timeout: 5000 },
  });
}

function mapPaymentStatus(status?: string): ProviderPaymentResult["status"] {
  if (status === "approved") return "approved";
  if (status === "rejected") return "rejected";
  if (status === "cancelled") return "cancelled";
  if (status === "refunded") return "refunded";
  return "pending";
}

export class MercadoPagoCheckoutProProvider implements PaymentProvider {
  async createCheckoutPreference(input: CheckoutPreferenceInput) {
    const client = getClient();
    const preference = new Preference(client);
    const baseUrl = getBaseUrl();
    const localBaseUrl = isLocalBaseUrl(baseUrl);
    const externalReference = `account:${input.accountId}:payment:${crypto.randomUUID()}`;
    const body: PreferenceRequest = {
      items: [
        {
          id: input.accountId,
          title: input.description,
          quantity: 1,
          unit_price: input.amount,
          currency_id: "ARS",
        },
      ],
      payer: input.payerEmail ? { email: input.payerEmail } : undefined,
      external_reference: externalReference,
      notification_url: localBaseUrl ? undefined : `${baseUrl}/api/payments/mercado-pago/webhook`,
      back_urls: {
        success: `${baseUrl}/payments/mercado-pago/success`,
        pending: `${baseUrl}/payments/mercado-pago/pending`,
        failure: `${baseUrl}/payments/mercado-pago/failure`,
      },
      auto_return: localBaseUrl ? undefined : "approved",
      binary_mode: false,
      metadata: {
        account_id: input.accountId,
        provider: providerName,
      },
    };

    const response = await preference.create({
      body,
      requestOptions: { idempotencyKey: externalReference },
    });

    if (!response.id || (!response.init_point && !response.sandbox_init_point)) {
      throw new Error(
        `MERCADO_PAGO_PREFERENCE_FAILED: ${JSON.stringify({
          id: response.id,
          init_point: response.init_point,
          sandbox_init_point: response.sandbox_init_point,
          status: response.api_response?.status,
        })}`,
      );
    }

    return {
      provider: providerName,
      preferenceId: response.id,
      initPoint: response.init_point ?? response.sandbox_init_point ?? "",
      sandboxInitPoint: response.sandbox_init_point,
      externalReference,
    };
  }

  async getPayment(externalPaymentId: string) {
    const client = getClient();
    const payment = new Payment(client);
    const response = await payment.get({ id: externalPaymentId });

    return {
      provider: providerName,
      externalTransactionId: String(response.id ?? externalPaymentId),
      externalReference: response.external_reference,
      status: mapPaymentStatus(response.status),
      amount: response.transaction_amount,
      method: response.payment_type_id ?? response.payment_method_id,
      rawStatus: response.status,
    };
  }
}
