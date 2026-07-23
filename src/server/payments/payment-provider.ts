export type CheckoutPreferenceInput = {
  accountId: string;
  amount: number;
  description: string;
  payerEmail?: string;
};

export type CheckoutPreferenceResult = {
  provider: string;
  preferenceId: string;
  initPoint: string;
  sandboxInitPoint?: string;
  externalReference: string;
};

export type ProviderPaymentStatus = "pending" | "approved" | "rejected" | "cancelled" | "refunded";

export type ProviderPaymentResult = {
  provider: string;
  externalTransactionId: string;
  externalReference?: string;
  status: ProviderPaymentStatus;
  amount?: number;
  method?: string;
  rawStatus?: string;
};

export interface PaymentProvider {
  createCheckoutPreference(input: CheckoutPreferenceInput): Promise<CheckoutPreferenceResult>;
  getPayment(externalPaymentId: string): Promise<ProviderPaymentResult>;
}
