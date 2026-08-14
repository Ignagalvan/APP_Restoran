import type { ReactNode } from "react";

import TableNotFound from "@/app/mesa/[mesa]/not-found";
import { getPublicTableForCode } from "@/lib/get-public-table";

export default async function TableLayout({ children, params }: { children: ReactNode; params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const resolved = await getPublicTableForCode(mesa);
  if (!resolved) return <TableNotFound />;
  return children;
}
