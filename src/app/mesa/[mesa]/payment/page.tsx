import type { Metadata } from "next";

import { SharedAccountExperience } from '@/components/shared-account-experience';

export const metadata: Metadata = { title: "Cuenta y pagos", description: "Consumos y pagos verificados por Caja" };

export default async function TablePaymentRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  return <SharedAccountExperience key={mesa} mesa={mesa} />;
}
