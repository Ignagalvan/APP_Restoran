import { accountData, type AccountData } from "@/lib/account-data";

export type SplitMode = "products" | "equal" | "full";

export interface SelectedSplitProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface PaymentDraft {
  restaurant: string;
  table: string;
  mode: SplitMode;
  selectedProducts: SelectedSplitProduct[];
  quantityByProduct: Record<string, number>;
  amount: number;
  unassignedBalance: number;
}

interface CreatePaymentDraftInput {
  account?: AccountData;
  mode: SplitMode;
  selectedQuantities: Record<string, number>;
  people: number;
  fixedAmount?: number;
}

export const getAccountTotal = (account: AccountData = accountData) =>
  account.items.reduce((total, item) => {
    const quantity = Number.isFinite(item.quantity) ? Math.max(0, Math.trunc(item.quantity)) : 0;
    const unitPrice = Number.isFinite(item.unitPrice) ? Math.max(0, item.unitPrice) : 0;
    return total + quantity * unitPrice;
  }, 0);

export const createPaymentDraft = ({
  account = accountData,
  mode,
  selectedQuantities,
  people,
  fixedAmount,
}: CreatePaymentDraftInput): PaymentDraft | null => {
  if (mode !== "products" && mode !== "equal" && mode !== "full") return null;

  const accountTotal = getAccountTotal(account);
  if (accountTotal <= 0) return null;

  const normalizedPeople = Math.min(10, Math.max(2, Math.trunc(Number.isFinite(people) ? people : 2)));
  const fixedDraftAmount = Number.isFinite(fixedAmount) ? fixedAmount : undefined;
  const selectedProducts =
    mode === "products"
      ? account.items.flatMap((item) => {
          const available = Number.isFinite(item.quantity) ? Math.max(0, Math.trunc(item.quantity)) : 0;
          const unitPrice = Number.isFinite(item.unitPrice) ? Math.max(0, item.unitPrice) : 0;
          const requested = selectedQuantities[item.id];
          const quantity = Math.min(available, Math.max(0, Math.trunc(Number.isFinite(requested) ? requested : 0)));
          return quantity > 0 && unitPrice > 0
            ? [{ id: item.id, name: item.name, quantity, unitPrice, subtotal: quantity * unitPrice }]
            : [];
        })
      : [];
  const amount =
    mode === "products"
      ? selectedProducts.reduce((total, item) => total + item.subtotal, 0)
      : mode === "equal"
        ? Math.min(accountTotal, Math.max(0, Math.trunc(fixedDraftAmount ?? Math.ceil(accountTotal / normalizedPeople))))
        : accountTotal;

  if (!Number.isFinite(amount) || amount <= 0) return null;

  return {
    restaurant: account.restaurant,
    table: account.table,
    mode,
    selectedProducts,
    quantityByProduct: Object.fromEntries(selectedProducts.map((item) => [item.id, item.quantity])),
    amount,
    unassignedBalance: Math.max(0, accountTotal - amount),
  };
};
