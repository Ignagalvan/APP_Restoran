import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { getPublicTableForCode } from "@/lib/get-public-table";

export default async function TableLayout({ children, params }: { children: ReactNode; params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const resolved = await getPublicTableForCode(mesa);
  if (!resolved) notFound();
  return children;
}
