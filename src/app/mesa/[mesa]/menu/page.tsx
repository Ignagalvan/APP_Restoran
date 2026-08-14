import type { Metadata } from "next";

import { MenuPage } from "@/components/menu-page";
import { getMenuCategories } from "@/lib/remote-menu";
import { getTableRouteContext } from "@/lib/table-context";
import { getPublicTableForCode } from "@/lib/get-public-table";

export const metadata: Metadata = { title: "Nuestra carta — Alma de Pueblo", description: "Menú digital por QR de mesa" };

export default async function TableMenuRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const table = await getPublicTableForCode(mesa);
  const context = getTableRouteContext(mesa, table?.table.name);
  const categories = await getMenuCategories();
  return <MenuPage tableLabel={context.tableLabel} homePath={context.basePath} menuPath={`${context.basePath}/menu`} categories={categories} />;
}
