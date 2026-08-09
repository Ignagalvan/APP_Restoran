import type { Metadata } from "next";

import { AccountPage } from "@/components/account-page";
import { getAccountForMesa } from "@/lib/get-table-account";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Tu consumo — Alma de Pueblo", description: "Cuenta digital por QR de mesa" };

export default async function TableAccountRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const context = getTableRouteContext(mesa);
  const account = await getAccountForMesa(mesa);
  return <AccountPage tableLabel={context.tableLabel} homePath={context.basePath} splitPath={`${context.basePath}/split`} paymentPath={`${context.basePath}/payment`} account={account} />;
}
