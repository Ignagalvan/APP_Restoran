import type { Metadata } from "next";
import { connection } from 'next/server';
import { MenuPreview } from "@/components/menu-preview";
import { menuPreviewOrigins } from "@/lib/menu-preview-origins";

export const metadata: Metadata = { title: "Vista previa de la carta", robots: { index: false, follow: false } };
export default async function MenuPreviewPage() {
  await connection();
  return <MenuPreview allowedOrigins={menuPreviewOrigins(process.env.MENU_PREVIEW_PANEL_ORIGINS, process.env.NODE_ENV !== "production")} />;
}
