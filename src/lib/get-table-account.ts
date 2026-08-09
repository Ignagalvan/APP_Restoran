import { accountData, type AccountData } from "@/lib/account-data";
import { getRepository } from "@/server/storage/get-repository";

function formatUpdatedAt(iso: string) {
  return new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso)) + " hs";
}

/**
 * Resuelve la cuenta de una mesa a partir del QR/ruta (`mesa`).
 * Si existe una mesa real con sesión y cuenta activa en el repositorio (data/store.json),
 * devuelve esos datos reales. Si no hay match (ej: navegando con un numero de mesa
 * arbitrario en desarrollo), cae al demo estático para no romper la UI.
 */
export async function getAccountForMesa(mesa: string): Promise<AccountData> {
  const repository = getRepository();
  const table = await repository.findTableByQrCode(mesa);

  if (!table) {
    return { ...accountData, table: `Mesa ${mesa}` };
  }

  const session = await repository.getActiveSessionByTable(table.id);
  if (!session) {
    return { ...accountData, table: table.label };
  }

  const account = await repository.getAccountBySession(session.id);
  if (!account) {
    return { ...accountData, table: table.label };
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
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })),
  };
}
