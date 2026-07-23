import type { Metadata } from "next";

import { SplitPage } from "@/components/split-page";

export const metadata: Metadata = { title: "Dividir cuenta — Lumbre", description: "División inteligente de la cuenta de la Mesa 12" };

export default function SplitAccountPage() {
  return <SplitPage />;
}
