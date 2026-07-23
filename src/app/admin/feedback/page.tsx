import type { Metadata } from "next";

import { AdminFeedbackView } from "@/components/admin/admin-feedback-view";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminRestaurant } from "@/lib/admin/admin-data";

export const metadata: Metadata = { title: "Feedback — Panel Lumbre", description: "Feedback mock del panel Restaurant OS" };

export default function AdminFeedbackRoute() {
  return (
    <AdminShell restaurant={getAdminRestaurant()} active="feedback" title="Feedback" eyebrow="Experiencia">
      <AdminFeedbackView />
    </AdminShell>
  );
}
