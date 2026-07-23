import type { Metadata } from "next";

import { GuestHome } from "@/components/guest-home";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Lumbre — Mesa", description: "Home del comensal por QR de mesa" };

export default async function TableHomeRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const context = getTableRouteContext(mesa);
  return <GuestHome tableLabel={context.tableLabel} basePath={context.basePath} />;
}
