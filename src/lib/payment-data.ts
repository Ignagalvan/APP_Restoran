import { Banknote, CreditCard, WalletCards, type LucideIcon } from "lucide-react";

import type { PaymentDraft } from "@/lib/split-data";
import { isValidTipSelection, type TipSelection } from "@/lib/tip-data";

export type PaymentMethodId = "mercado-pago" | "card" | "cash";

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface PaymentResultData {
  operationId: string;
  restaurant: string;
  table: string;
  methodId: PaymentMethodId;
  baseAmount: number;
  tipAmount: number;
  totalAmount: number;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "mercado-pago", name: "Mercado Pago", description: "Checkout Pro sandbox", icon: WalletCards },
  { id: "card", name: "Tarjeta", description: "Se procesa desde Mercado Pago", icon: CreditCard },
  { id: "cash", name: "Efectivo", description: "Informar pago en la mesa", icon: Banknote },
];

export function isValidPaymentDraft(draft: PaymentDraft | null): draft is PaymentDraft {
  if (!draft || !draft.restaurant.trim() || !draft.table.trim()) return false;
  if (!Number.isFinite(draft.amount) || draft.amount <= 0) return false;
  if (!Number.isFinite(draft.unassignedBalance) || draft.unassignedBalance < 0) return false;
  if (draft.mode === "equal" || draft.mode === "full") return true;
  if (draft.mode !== "products" || draft.selectedProducts.length === 0) return false;
  const subtotal = draft.selectedProducts.reduce((total, product) => {
    if (!Number.isInteger(product.quantity) || product.quantity <= 0 || !Number.isFinite(product.unitPrice) || product.unitPrice <= 0) {
      return Number.NaN;
    }
    if (product.subtotal !== product.quantity * product.unitPrice) return Number.NaN;
    return total + product.subtotal;
  }, 0);
  return Number.isFinite(subtotal) && subtotal === draft.amount;
}

export function createPaymentResult(draft: PaymentDraft, methodId: PaymentMethodId, tipSelection: TipSelection): PaymentResultData | null {
  if (!isValidPaymentDraft(draft) || !paymentMethods.some((method) => method.id === methodId)) return null;
  if (!isValidTipSelection(tipSelection, draft.amount)) return null;
  return {
    operationId: `LUM-${Date.now().toString(36).toUpperCase()}`,
    restaurant: draft.restaurant,
    table: draft.table,
    methodId,
    baseAmount: draft.amount,
    tipAmount: tipSelection.tipAmount,
    totalAmount: tipSelection.totalAmount,
  };
}
