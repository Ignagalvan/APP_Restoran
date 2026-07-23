import type { AccountData, AccountItemData } from "@/lib/account-data";
import { getAccountTotal } from "@/lib/split-data";

export type ProductUnitStatus = "available" | "selected_by_me" | "reserved_by_other" | "paid";
export type EqualPartStatus = "available" | "selected_by_me" | "paying" | "paid";

export interface ProductUnit {
  id: string;
  itemId: string;
  unitIndex: number;
  name: string;
  amount: number;
  status: ProductUnitStatus;
  holderLabel?: string;
  paymentId?: string;
  reservationExpiresAt?: string;
}

export interface ProductUnitGroup {
  item: AccountItemData;
  units: ProductUnit[];
  selectedCount: number;
  availableCount: number;
  reservedCount: number;
  paidCount: number;
}

export interface EqualPart {
  id: string;
  index: number;
  amount: number;
  status: EqualPartStatus;
  holderLabel?: string;
  paymentId?: string;
  reservationExpiresAt?: string;
}

export interface CollaborativeOverview {
  totalAmount: number;
  paidAmount: number;
  inProcessAmount: number;
  pendingAmount: number;
  selectedAmount: number;
  progress: number;
  messages: string[];
  allPaid: boolean;
}

const productMockState: Record<string, Partial<ProductUnit>> = {
  "bife-1": { status: "paid", holderLabel: "Una persona", paymentId: "pay_demo_001" },
  "malbec-1": { status: "reserved_by_other", holderLabel: "Otra persona", reservationExpiresAt: "2 min" },
};

export const buildProductUnitGroups = (account: AccountData, selectedUnitIds: string[]): ProductUnitGroup[] => {
  const selected = new Set(selectedUnitIds);

  return account.items.map((item) => {
    const units = Array.from({ length: item.quantity }, (_, index) => {
      const id = `${item.id}-${index + 1}`;
      const mock = productMockState[id];
      const unavailable = mock?.status === "paid" || mock?.status === "reserved_by_other";
      const status: ProductUnitStatus = unavailable ? mock.status! : selected.has(id) ? "selected_by_me" : "available";

      return {
        id,
        itemId: item.id,
        unitIndex: index + 1,
        name: item.name,
        amount: item.unitPrice,
        status,
        holderLabel: mock?.holderLabel,
        paymentId: mock?.paymentId,
        reservationExpiresAt: mock?.reservationExpiresAt,
      };
    });

    return {
      item,
      units,
      selectedCount: units.filter((unit) => unit.status === "selected_by_me").length,
      availableCount: units.filter((unit) => unit.status === "available").length,
      reservedCount: units.filter((unit) => unit.status === "reserved_by_other").length,
      paidCount: units.filter((unit) => unit.status === "paid").length,
    };
  });
};

export const getSelectedQuantitiesFromUnits = (groups: ProductUnitGroup[]) =>
  groups.reduce<Record<string, number>>((quantities, group) => {
    if (group.selectedCount > 0) quantities[group.item.id] = group.selectedCount;
    return quantities;
  }, {});

export const getSelectedProductUnits = (groups: ProductUnitGroup[]) =>
  groups.flatMap((group) => group.units.filter((unit) => unit.status === "selected_by_me"));

export const createEqualParts = (total: number, people: number, selectedPartId: string | null): EqualPart[] => {
  const normalizedPeople = Math.min(10, Math.max(2, Math.trunc(Number.isFinite(people) ? people : 2)));
  const baseAmount = Math.floor(total / normalizedPeople);
  const remainder = total - baseAmount * normalizedPeople;

  return Array.from({ length: normalizedPeople }, (_, index) => {
    const id = `equal-part-${normalizedPeople}-${index + 1}`;
    const amount = index === normalizedPeople - 1 ? baseAmount + remainder : baseAmount;
    const mock =
      index === 0
        ? { status: "paid" as EqualPartStatus, holderLabel: "Una persona", paymentId: "pay_demo_equal_001" }
        : index === 1 && normalizedPeople > 2
          ? { status: "paying" as EqualPartStatus, holderLabel: "Otra persona", reservationExpiresAt: "2 min" }
          : null;

    return {
      id,
      index: index + 1,
      amount,
      status: mock?.status ?? (selectedPartId === id ? "selected_by_me" : "available"),
      holderLabel: mock?.holderLabel,
      paymentId: mock?.paymentId,
      reservationExpiresAt: mock?.reservationExpiresAt,
    };
  });
};

export const getProductOverview = (account: AccountData, groups: ProductUnitGroup[]): CollaborativeOverview => {
  const allUnits = groups.flatMap((group) => group.units);
  const paidAmount = allUnits.filter((unit) => unit.status === "paid").reduce((total, unit) => total + unit.amount, 0);
  const inProcessAmount = allUnits.filter((unit) => unit.status === "reserved_by_other").reduce((total, unit) => total + unit.amount, 0);
  const selectedAmount = allUnits.filter((unit) => unit.status === "selected_by_me").reduce((total, unit) => total + unit.amount, 0);
  const totalAmount = getAccountTotal(account);
  const pendingAmount = Math.max(0, totalAmount - paidAmount);
  const messages = [
    inProcessAmount > 0 ? "Hay productos reservados por otra persona." : "Todos los productos pendientes estan disponibles.",
    selectedAmount > 0 ? "Tu seleccion queda reservada al continuar al pago." : "Elegi unidades disponibles para preparar tu pago.",
    pendingAmount === 0 ? "Cuenta saldada." : "La mesa sigue abierta hasta que el saldo llegue a cero.",
  ];

  return {
    totalAmount,
    paidAmount,
    inProcessAmount,
    pendingAmount,
    selectedAmount,
    progress: totalAmount > 0 ? paidAmount / totalAmount : 0,
    messages,
    allPaid: pendingAmount === 0,
  };
};

export const getEqualOverview = (totalAmount: number, parts: EqualPart[]): CollaborativeOverview => {
  const paidAmount = parts.filter((part) => part.status === "paid").reduce((total, part) => total + part.amount, 0);
  const inProcessAmount = parts.filter((part) => part.status === "paying").reduce((total, part) => total + part.amount, 0);
  const selectedAmount = parts.filter((part) => part.status === "selected_by_me").reduce((total, part) => total + part.amount, 0);
  const pendingAmount = Math.max(0, totalAmount - paidAmount);
  const messages = [
    inProcessAmount > 0 ? "Otra parte esta en proceso de pago." : "Las partes pendientes estan disponibles.",
    selectedAmount > 0 ? "Tu parte queda reservada al continuar al pago." : "Toma una parte disponible para pagar.",
    pendingAmount === 0 ? "Cuenta saldada." : "No se puede cerrar la mesa con partes pendientes.",
  ];

  return {
    totalAmount,
    paidAmount,
    inProcessAmount,
    pendingAmount,
    selectedAmount,
    progress: totalAmount > 0 ? paidAmount / totalAmount : 0,
    messages,
    allPaid: pendingAmount === 0,
  };
};
