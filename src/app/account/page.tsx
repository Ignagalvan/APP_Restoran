import type { Metadata } from "next";

import { AccountPage } from "@/components/account-page";

export const metadata: Metadata = { title: "Tu consumo — Lumbre", description: "Cuenta digital de la Mesa 12" };

export default function DigitalAccountPage() {
  return <AccountPage />;
}
