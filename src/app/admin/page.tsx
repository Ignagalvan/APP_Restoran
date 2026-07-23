import type { Metadata } from "next";

import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminRestaurant } from "@/lib/admin/admin-data";

export const metadata: Metadata = { title: "Panel Restaurante — Lumbre", description: "Panel básico mock de Restaurant OS" };

export default function AdminRoute() {
  return (
    <AdminShell restaurant={getAdminRestaurant()} active="overview" title="Panel Restaurante" eyebrow="Resumen">
      <AdminOverview />
    </AdminShell>
  );
}
