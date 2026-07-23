import type { Metadata } from "next";

import { SplitPage } from "@/components/split-page";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Dividir cuenta — Lumbre", description: "División de cuenta por QR de mesa" };

export default async function TableSplitRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const context = getTableRouteContext(mesa);
  return <SplitPage tableLabel={context.tableLabel} accountPath={`${context.basePath}/account`} paymentPath={`${context.basePath}/payment`} />;
}
