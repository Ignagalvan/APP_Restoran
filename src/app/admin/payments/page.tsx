import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { TransferPaymentsView } from "@/components/admin/transfer-payments-view";
import { getAdminRestaurant } from "@/lib/admin/admin-data";

export const metadata: Metadata = { title: "Pagos - Alma de Pueblo", description: "Revision de transferencias" };

export default function AdminPaymentsPage() {
  return <AdminShell restaurant={getAdminRestaurant()} active="payments" title="Pagos" eyebrow="Caja"><TransferPaymentsView /></AdminShell>;
}
