import type { Metadata } from "next";

import { FeedbackPage } from "@/components/feedback-page";
import { getTableRouteContext } from "@/lib/table-context";

export const metadata: Metadata = { title: "Tu experiencia — Lumbre", description: "Feedback por QR de mesa" };

export default async function TableFeedbackRoute({ params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const context = getTableRouteContext(mesa);
  return <FeedbackPage tableLabel={context.tableLabel} homePath={context.basePath} />;
}
