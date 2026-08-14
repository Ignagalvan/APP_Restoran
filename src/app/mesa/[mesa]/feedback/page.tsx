import type { Metadata } from "next";

import { FeedbackPage } from "@/components/feedback-page";
import { getTableRouteContext } from "@/lib/table-context";
import { getPublicTableForCode } from "@/lib/get-public-table";

export const metadata: Metadata = { title: "Tu experiencia — Alma de Pueblo", description: "Feedback por QR de mesa" };

export default async function TableFeedbackRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const table = await getPublicTableForCode(mesa);
  const context = getTableRouteContext(mesa, table?.table.name);
  return <FeedbackPage tableLabel={context.tableLabel} homePath={context.basePath} />;
}
