import type { Metadata } from "next";

import { MenuPage } from "@/components/menu-page";
import { getTableRouteContext } from "@/lib/table-context";
import { getRemoteMenuCategories } from "@/lib/remote-menu";

export const metadata: Metadata = { title: "Nuestra carta — Alma de Pueblo", description: "Menú digital por QR de mesa" };

export default async function TableMenuRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const context = getTableRouteContext(mesa);
  return <MenuPage tableLabel={context.tableLabel} homePath={context.basePath} menuPath={`${context.basePath}/menu`} categories={await getRemoteMenuCategories()} />;
}
