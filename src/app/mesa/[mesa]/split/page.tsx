import type { Metadata } from "next";

import { SharedAccountExperience } from '@/components/shared-account-experience';

export const metadata: Metadata = { title: "Dividir cuenta — Alma de Pueblo", description: "División de cuenta por QR de mesa" };

export default async function TableSplitRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  return <SharedAccountExperience key={mesa} mesa={mesa} />;
}
