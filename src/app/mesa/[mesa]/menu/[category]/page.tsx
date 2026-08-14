import type { Metadata } from "next";

import { MenuCategoryPage } from "@/components/menu-category-page";
import { getTableRouteContext } from "@/lib/table-context";
import { getMenuCategories } from "@/lib/remote-menu";
import { getPublicTableForCode } from "@/lib/get-public-table";

export const metadata: Metadata = { title: "Categoría del menú — Alma de Pueblo", description: "Categoría de la carta digital por QR de mesa" };

export default async function TableMenuCategoryRoute({ params }: { params: Promise<{ mesa: string; category: string }> }) {
  const { mesa, category } = await params;
  const table = await getPublicTableForCode(mesa);
  const context = getTableRouteContext(mesa, table?.table.name);
  const categories = await getMenuCategories();

  return <MenuCategoryPage categoryId={category} tableLabel={context.tableLabel} menuPath={`${context.basePath}/menu`} categories={categories} />;
}
