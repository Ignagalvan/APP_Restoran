import type { Metadata } from "next";

import { AccountPage } from "@/components/account-page";

export const metadata: Metadata = { title: "Tu consumo — Alma de Pueblo", description: "Cuenta digital de la Mesa 12" };

export default function DigitalAccountPage() {
  return <AccountPage />;
}
