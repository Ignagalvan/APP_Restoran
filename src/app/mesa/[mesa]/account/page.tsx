import type { Metadata } from "next";

import { AccountPage } from "@/components/account-page";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Tu consumo — Lumbre", description: "Cuenta digital por QR de mesa" };

export default async function TableAccountRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const context = getTableRouteContext(mesa);
  return <AccountPage tableLabel={context.tableLabel} homePath={context.basePath} splitPath={`${context.basePath}/split`} />;
}
