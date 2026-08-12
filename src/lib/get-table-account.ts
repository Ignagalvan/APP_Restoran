import { accountData, type AccountData } from "@/lib/account-data";
import { getRepository } from "@/server/storage/get-repository";

function formatUpdatedAt(iso: string) {
  return new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso)) + " hs";
}

type PublicAccountResponse = {
  restaurant?: { name?: string };
  sessionId?: string;
  openedAt?: string;
  tables?: Array<{ name?: string }>;
  bill?: { id: string; total: string | number; webPaymentEnabled: boolean; createdAt?: string };
  orders?: Array<{
    items?: Array<{
      id: string;
      nameSnapshot: string;
      quantity: number;
      unitPriceSnapshot: string | number;
    }>;
  }>;
};

const DEFAULT_MENU_API_URL = "https://resto-management-backend-86xq.onrender.com/api/v1";
const DEFAULT_RESTAURANT_SLUG = "alma-de-pueblo";

/**
 * Resuelve la cuenta de una mesa a partir del QR/ruta (`mesa`).
 * Si existe una mesa real con sesión y cuenta activa en el repositorio (data/store.json),
 * devuelve esos datos reales. Si no hay match (ej: navegando con un numero de mesa
 * arbitrario en desarrollo), cae al demo estático para no romper la UI.
 */
export async function getAccountForMesa(mesa: string): Promise<AccountData> {
  const remoteAccount = await getRemoteAccountForMesa(mesa);
  if (remoteAccount) return remoteAccount;

  const fallbackAccount = {
    ...accountData,
    table: `Mesa ${mesa}`,
    items: [],
    paymentEnabled: false,
    consumptionEnabled: false,
  };

  const repository = getRepository();
  const table = await repository.findTableByQrCode(mesa);

  if (!table) {
    return fallbackAccount;
  }

  const session = await repository.getActiveSessionByTable(table.id);
  if (!session) {
    return { ...fallbackAccount, table: table.label };
  }

  const account = await repository.getAccountBySession(session.id);
  if (!account) {
    return { ...fallbackAccount, table: table.label };
  }

  const items = await repository.getAccountItems(account.id);
  const restaurants = await repository.listRestaurants();
  const restaurant = restaurants.find((r) => r.id === table.restaurantId);

  return {
    restaurant: restaurant?.name ?? accountData.restaurant,
    table: table.label,
    status: "open",
    lastUpdated: formatUpdatedAt(account.lastSyncedAt),
    paymentEnabled: account.paymentEnabled,
    consumptionEnabled: account.paymentEnabled,
    items: account.paymentEnabled
      ? items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        }))
      : [],
  };
}

async function getRemoteAccountForMesa(mesa: string): Promise<AccountData | null> {
  try {
    const response = await fetch(`${apiBaseUrl()}/public/restaurants/${restaurantSlug()}/tables/${encodeURIComponent(mesa)}/account`, {
      cache: "no-store",
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as PublicAccountResponse;
    const items = (payload.orders ?? []).flatMap((order) =>
      (order.items ?? []).map((item) => ({
        id: item.id,
        name: item.nameSnapshot,
        quantity: item.quantity,
        unitPrice: Number(item.unitPriceSnapshot),
      })),
    );

    const paymentEnabled = Boolean(payload.bill?.webPaymentEnabled);

    return {
      restaurant: payload.restaurant?.name ?? accountData.restaurant,
      table: formatTableLabel(payload.tables, mesa),
      status: "open",
      lastUpdated: formatUpdatedAt(payload.bill?.createdAt ?? payload.openedAt ?? new Date().toISOString()),
      paymentEnabled,
      consumptionEnabled: paymentEnabled,
      sessionId: payload.sessionId,
      billId: payload.bill?.id,
      items: paymentEnabled ? items : [],
    };
  } catch {
    return null;
  }
}

function apiBaseUrl() {
  const configured = process.env.MENU_API_URL ?? process.env.NEXT_PUBLIC_MENU_API_URL ?? DEFAULT_MENU_API_URL;
  return configured.replace(/\/+$/, "");
}

function restaurantSlug() {
  return process.env.MENU_RESTAURANT_SLUG ?? process.env.NEXT_PUBLIC_MENU_RESTAURANT_SLUG ?? DEFAULT_RESTAURANT_SLUG;
}

function formatTableLabel(tables: PublicAccountResponse["tables"], fallback: string) {
  const names = (tables ?? []).map((table) => table.name).filter((name): name is string => Boolean(name));
  return names.length > 0 ? Array.from(new Set(names)).join(" + ") : `Mesa ${fallback}`;
}
