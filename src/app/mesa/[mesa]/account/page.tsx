import type { Metadata } from "next";

import { SharedAccountExperience } from '@/components/shared-account-experience';

export const metadata: Metadata = { title: "Tu consumo — Alma de Pueblo", description: "Cuenta digital por QR de mesa" };

export default async function TableAccountRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  return <SharedAccountExperience key={mesa} mesa={mesa} />;
}
