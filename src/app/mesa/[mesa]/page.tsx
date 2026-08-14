import type { Metadata } from "next";

import { GuestHome } from "@/components/guest-home";
import { getTableRouteContext } from "@/lib/table-context";
import { getPublicTableForCode } from "@/lib/get-public-table";

export const metadata: Metadata = { title: "Alma de Pueblo — Mesa", description: "Home del comensal por QR de mesa" };

export default async function TableHomeRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const table = await getPublicTableForCode(mesa);
  const context = getTableRouteContext(mesa, table?.table.name);
  return <GuestHome tableLabel={context.tableLabel} basePath={context.basePath} />;
}
