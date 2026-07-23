import type { Metadata } from "next";

import { MenuCategoryPage } from "@/components/menu-category-page";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Categoria del menu - Lumbre", description: "Categoria de la carta digital por QR de mesa" };

export default async function TableMenuCategoryRoute({ params }: { params: Promise<{ mesa: string; category: string }> }) {
  const { mesa, category } = await params;
  const context = getTableRouteContext(mesa);

  return <MenuCategoryPage categoryId={category} tableLabel={context.tableLabel} menuPath={`${context.basePath}/menu`} />;
}
