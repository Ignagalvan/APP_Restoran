import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTablesView } from "@/components/admin/admin-tables-view";
import { getAdminRestaurant } from "@/lib/admin/admin-data";

export const metadata: Metadata = { title: "Mesas — Panel Lumbre", description: "Mesas mock del panel Restaurant OS" };

export default function AdminTablesRoute() {
  return (
    <AdminShell restaurant={getAdminRestaurant()} active="tables" title="Mesas" eyebrow="Operación">
      <AdminTablesView />
    </AdminShell>
  );
}
