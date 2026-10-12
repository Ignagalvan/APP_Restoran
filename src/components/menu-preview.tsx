"use client";

import { useEffect, useState } from "react";
import { MenuPage } from "./menu-page";
import { MenuCategoryPage } from "./menu-category-page";
import { mapApiMenu, type ApiCategory } from "@/lib/remote-menu";
import type { MenuCategory } from "@/lib/menu-data";

type Preview = { restaurant: { id: string; name: string }; menu: ApiCategory[] };
export function MenuPreview({ allowedOrigins }: { allowedOrigins: string[] }) {
  const [preview, setPreview] = useState<{ categories: MenuCategory[]; requestId: unknown; origin: string } | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  useEffect(() => {
    if (window.parent === window) return;
    const receive = (event: MessageEvent) => {
      if (event.source !== window.parent || !allowedOrigins.includes(event.origin)) return;
      if (event.data?.type === 'restaurant-os:menu-preview:hello') { window.parent.postMessage({ type: 'restaurant-os:menu-preview:ready' }, event.origin); return; }
      if (event.data?.type !== "restaurant-os:menu-preview") return;
      const payload = event.data.payload as Preview | undefined;
      if (!payload?.restaurant?.id || typeof payload.restaurant.name !== "string" || !Array.isArray(payload.menu)) return;
      try { setPreview({ categories: mapApiMenu(payload.menu), requestId: event.data.requestId, origin: event.origin }); } catch { /* Ignore malformed messages, never request a public fallback menu. */ }
    };
    window.addEventListener("message", receive);
    allowedOrigins.forEach(origin => window.parent.postMessage({ type: "restaurant-os:menu-preview:ready" }, origin));
    return () => window.removeEventListener("message", receive);
  }, [allowedOrigins]);
  useEffect(() => { if (preview) window.parent.postMessage({ type: "restaurant-os:menu-preview:rendered", requestId: preview.requestId }, preview.origin); }, [preview]);
  if (!preview) return <p className="px-5 py-16 text-center text-sm text-muted-foreground">{allowedOrigins.length ? "Esperando la carta del panel…" : "Falta autorizar el origen del panel para esta vista previa."}</p>;
  const category = preview.categories.find(item => item.id === categoryId);
  return category ? <MenuCategoryPage key={category.id} categoryId={category.id} categories={preview.categories} preview onBack={() => setCategoryId(null)} /> : <MenuPage categories={preview.categories} preview onSelectCategory={setCategoryId} />;
}
