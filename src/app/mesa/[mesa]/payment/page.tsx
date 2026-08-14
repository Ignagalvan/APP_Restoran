import type { Metadata } from "next";

import { PaymentPage } from "@/components/payment-page";
import { getPublicTableForCode } from "@/lib/get-public-table";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Tu pago — Alma de Pueblo", description: "Resumen y checkout sandbox por QR de mesa" };

export default async function TablePaymentRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const table = await getPublicTableForCode(mesa);
  const context = getTableRouteContext(mesa, table?.table.name);

  return <PaymentPage tableLabel={context.tableLabel} accountPath={`${context.basePath}/account`} splitPath={`${context.basePath}/split`} feedbackPath={`${context.basePath}/feedback`} />;
}
