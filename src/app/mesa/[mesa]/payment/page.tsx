import type { Metadata } from "next";

import { PaymentPage } from "@/components/payment-page";

export const metadata: Metadata = { title: "Tu pago - Lumbre", description: "Resumen y checkout sandbox por QR de mesa" };

export default async function TablePaymentRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const tableLabel = `Mesa ${mesa}`;

  return <PaymentPage tableLabel={tableLabel} accountPath={`/mesa/${mesa}/account`} splitPath={`/mesa/${mesa}/split`} feedbackPath={`/mesa/${mesa}/feedback`} />;
}
