import { cache } from "react";

export type PublicTable = {
  id: string;
  number: number;
  name: string;
  capacity: number;
  publicCode: string;
  status: "AVAILABLE" | "OCCUPIED" | "BILL_REQUESTED";
  visibility: "ACTIVE";
  version: number;
};

type PublicTableResponse = {
  restaurant: { id: string; name: string; slug: string };
  table: PublicTable;
  qrPath: string;
};

const DEFAULT_MENU_API_URL = "https://resto-management-backend-86xq.onrender.com/api/v1";
const DEFAULT_RESTAURANT_SLUG = "alma-de-pueblo";

export const getPublicTableForCode = cache(async (tableCode: string): Promise<PublicTableResponse | null> => {
  const normalizedCode = tableCode.trim();
  if (!normalizedCode) return null;

  try {
    const response = await fetch(
      `${apiBaseUrl()}/public/restaurants/${encodeURIComponent(restaurantSlug())}/tables/${encodeURIComponent(normalizedCode)}`,
      { cache: "no-store" },
    );
    if (!response.ok) return null;
    return (await response.json()) as PublicTableResponse;
  } catch {
    return null;
  }
});

function apiBaseUrl() {
  const configured = process.env.MENU_API_URL ?? process.env.NEXT_PUBLIC_MENU_API_URL ?? DEFAULT_MENU_API_URL;
  return configured.replace(/\/+$/, "");
}

function restaurantSlug() {
  return process.env.MENU_RESTAURANT_SLUG ?? process.env.NEXT_PUBLIC_MENU_RESTAURANT_SLUG ?? DEFAULT_RESTAURANT_SLUG;
}
