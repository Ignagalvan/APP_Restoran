import type { Metadata } from "next";

import { PaymentPage } from "@/components/payment-page";

export const metadata: Metadata = { title: "Tu pago - Lumbre", description: "Resumen y checkout sandbox de Restaurant OS" };

export default function PaymentRoute() {
  return <PaymentPage />;
}
