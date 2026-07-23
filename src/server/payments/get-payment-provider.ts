import { MercadoPagoCheckoutProProvider } from "./mercado-pago-provider";
import type { PaymentProvider } from "./payment-provider";

let mercadoPagoProvider: PaymentProvider | null = null;

export function getMercadoPagoProvider() {
  mercadoPagoProvider ??= new MercadoPagoCheckoutProProvider();
  return mercadoPagoProvider;
}
