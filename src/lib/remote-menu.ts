import { menuCategories, type MenuCategory, type MenuCategoryAccent } from "@/lib/menu-data";

type ApiProduct = { id: string; name: string; description?: string | null; imageUrl?: string | null; price: string | number; available: boolean; stock?: number };
type ApiCategory = { name: string; description?: string | null; products?: ApiProduct[] };

const apiUrl = (process.env.MENU_API_URL ?? "http://localhost:3000/api/v1").replace(/\/$/, "");
const restaurantSlug = process.env.MENU_RESTAURANT_SLUG ?? "alma-de-pueblo";

export async function getRemoteMenuCategories(): Promise<MenuCategory[]> {
  try {
    const response = await fetch(`${apiUrl}/public/restaurants/${encodeURIComponent(restaurantSlug)}/menu`, { next: { revalidate: 15 } });
    if (!response.ok) return menuCategories;
    const rows = (await response.json()) as ApiCategory[];
    const categories = rows.map((category, index) => mapCategory(category, index)).filter((category) => category.items.length > 0);
    return categories;
  } catch {
    return menuCategories;
  }
}

function mapCategory(category: ApiCategory, index: number): MenuCategory {
  const accent = getAccent(category.name);
  const localCategory = menuCategories.find((item) => item.accent === accent && normalizeText(item.name) === normalizeText(category.name))
    ?? menuCategories.find((item) => item.accent === accent);
  return {
    id: `${slugify(category.name)}-${index}`,
    name: category.name,
    description: category.description ?? "Nuestra selección de la carta.",
    shortDescription: category.description ?? "Productos disponibles.",
    accent,
    sections: localCategory?.sections,
    items: (category.products ?? []).filter((product) => product.available && (product.stock ?? 0) > 0).map((product) => {
      const localItem = menuCategories.flatMap((item) => item.items).find((item) => normalizeText(item.name) === normalizeText(product.name));
      return {
        id: product.id,
        name: product.name,
        description: product.description ?? localItem?.description,
        price: formatPrice(product.price),
        image: normalizeImageUrl(product.imageUrl) ?? localItem?.image ?? fallbackImage(accent),
        ingredients: localItem?.ingredients,
        pairing: localItem?.pairing,
        tags: localItem?.tags,
        section: localItem?.section,
        optionGroups: localItem?.optionGroups,
        heading: localItem?.heading,
        available: product.available,
        stock: product.stock ?? 0,
      };
    }),
  };
}

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "categoria";
}

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getAccent(name: string): MenuCategoryAccent {
  const normalized = name.toLowerCase();
  if (normalized.includes("entrada")) return "entradas";
  if (normalized.includes("bebida") || normalized.includes("bodega")) return "bebidas";
  if (normalized.includes("bambino") || normalized.includes("niño") || normalized.includes("nino")) return "ninos";
  if (normalized.includes("postre")) return "postres";
  return "principales";
}

function fallbackImage(accent: MenuCategoryAccent) {
  return accent === "entradas" ? "/images/menu/entrada.png" : accent === "bebidas" ? "/images/menu/bebida.png" : accent === "postres" ? "/images/menu/postre.png" : "/images/menu/principal.png";
}

function normalizeImageUrl(value?: string | null) {
  if (!value) return undefined;

  // The seeded catalog stores local menu assets inside a Supabase URL.
  // Serve those files from this app so every product keeps its own image.
  const localAsset = value.match(/\/menu\/images\/menu\/(.+)$/)?.[1];
  return localAsset ? `/images/menu/${localAsset}` : value;
}

function formatPrice(value: string | number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(Number(value));
}
