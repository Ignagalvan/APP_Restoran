import type { Metadata } from "next";

import { AdminSettingsPreview } from "@/components/admin/admin-settings-preview";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminRestaurant } from "@/lib/admin/admin-data";

export const metadata: Metadata = { title: "Configuración — Panel Lumbre", description: "Acceso mock a configuración básica" };

export default function AdminSettingsRoute() {
  return (
    <AdminShell restaurant={getAdminRestaurant()} active="settings" title="Configuración" eyebrow="RF-010">
      <AdminSettingsPreview />
    </AdminShell>
  );
}
