import { menuCategories, type MenuCategory, type MenuCategoryAccent, type MenuItem } from "@/lib/menu-data";

const DEFAULT_MENU_API_URL = "https://resto-management-backend-86xq.onrender.com/api/v1";
const DEFAULT_RESTAURANT_SLUG = "alma-de-pueblo";

type ApiProduct = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  price: string | number;
  available?: boolean | null;
  stock?: number | null;
};

type ApiCategory = {
  id?: string;
  name: string;
  description?: string | null;
  available?: boolean | null;
  products?: ApiProduct[];
};

const categoryAccentFallbacks: MenuCategoryAccent[] = ["entradas", "principales", "bebidas", "ninos", "postres"];
const staticCategoryByName = new Map(menuCategories.map((category) => [normalizeText(category.name), category]));
const staticItemByName = new Map(menuCategories.flatMap((category) => category.items.map((item) => [normalizeText(item.name), item] as const)));

export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const response = await fetch(`${apiBaseUrl()}/public/restaurants/${encodeURIComponent(restaurantSlug())}/menu`, {
      cache: "no-store",
    });

    if (!response.ok) return menuCategories;

    const rows = (await response.json()) as ApiCategory[];
    const categories = rows.map(mapCategory).filter((category): category is MenuCategory => Boolean(category));

    return categories.length > 0 ? categories : menuCategories;
  } catch {
    return menuCategories;
  }
}

export async function getMenuCategory(categoryId: string) {
  const categories = await getMenuCategories();
  return categories.find((category) => category.id === categoryId) ?? null;
}

function mapCategory(category: ApiCategory, index: number): MenuCategory | null {
  if (category.available === false) return null;

  const localCategory = staticCategoryByName.get(normalizeText(category.name));
  const accent = localCategory?.accent ?? getAccent(category.name, index);
  const items = (category.products ?? []).filter(isAvailable).map((product) => mapProduct(product, accent));

  if (items.length === 0) return null;

  return {
    id: localCategory?.id ?? slugify(category.name),
    name: category.name,
    description: category.description ?? localCategory?.description ?? "Nuestra seleccion de la carta.",
    shortDescription: localCategory?.shortDescription ?? "Productos disponibles.",
    accent,
    sections: localCategory?.sections,
    items,
  };
}

function mapProduct(product: ApiProduct, accent: MenuCategoryAccent): MenuItem {
  const localItem = staticItemByName.get(normalizeText(product.name));

  return {
    ...localItem,
    id: localItem?.id ?? product.id,
    name: product.name,
    description: product.description ?? localItem?.description,
    price: formatPrice(product.price),
    image: normalizeImageUrl(product.imageUrl) ?? localItem?.image ?? fallbackImage(accent),
  };
}

function apiBaseUrl() {
  const configured = process.env.MENU_API_URL ?? process.env.NEXT_PUBLIC_MENU_API_URL ?? DEFAULT_MENU_API_URL;
  return configured.replace(/\/+$/, "");
}

function restaurantSlug() {
  return process.env.MENU_RESTAURANT_SLUG ?? process.env.NEXT_PUBLIC_MENU_RESTAURANT_SLUG ?? DEFAULT_RESTAURANT_SLUG;
}

function isAvailable(product: ApiProduct) {
  return product.available !== false && (product.stock == null || product.stock > 0);
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value: string) {
  return normalizeText(value).replace(/\s+/g, "-") || "categoria";
}

function getAccent(name: string, index: number): MenuCategoryAccent {
  const normalized = normalizeText(name);
  if (normalized.includes("entrada")) return "entradas";
  if (normalized.includes("bebida") || normalized.includes("bodega")) return "bebidas";
  if (normalized.includes("bambino") || normalized.includes("nino")) return "ninos";
  if (normalized.includes("postre")) return "postres";
  return categoryAccentFallbacks[index % categoryAccentFallbacks.length];
}

function fallbackImage(accent: MenuCategoryAccent) {
  if (accent === "entradas") return "/images/menu/entrada.png";
  if (accent === "bebidas") return "/images/menu/bebida.png";
  if (accent === "postres") return "/images/menu/postre.png";
  return "/images/menu/principal.png";
}

function normalizeImageUrl(value?: string | null) {
  if (!value) return undefined;

  const localAsset = value.match(/\/menu\/images\/menu\/(.+)$/)?.[1];
  return localAsset ? `/images/menu/${localAsset}` : value;
}

function formatPrice(value: string | number) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return `$ ${value}`;
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(amount);
}
