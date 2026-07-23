export type TipId = "none" | "5" | "10" | "15";

export interface TipInput {
  baseAmount: number;
  currency: "ARS";
}

export interface TipSelection {
  type: "none" | "percentage";
  optionId: TipId;
  percentage: 0 | 5 | 10 | 15;
  baseAmount: number;
  tipAmount: number;
  totalAmount: number;
  currency: "ARS";
}

export const tipOptions: Array<{ id: TipId; label: string; percentage: TipSelection["percentage"] }> = [
  { id: "none", label: "Sin propina", percentage: 0 },
  { id: "5", label: "5%", percentage: 5 },
  { id: "10", label: "10%", percentage: 10 },
  { id: "15", label: "15%", percentage: 15 },
];

export function isValidTipInput(input: TipInput) {
  return input.currency === "ARS" && Number.isSafeInteger(input.baseAmount) && input.baseAmount > 0;
}

export function createTipSelection(input: TipInput, optionId: TipId | null): TipSelection | null {
  if (!isValidTipInput(input) || optionId === null) return null;
  const option = tipOptions.find((candidate) => candidate.id === optionId);
  if (!option) return null;
  const tipAmount = Math.round((input.baseAmount * option.percentage) / 100);
  const totalAmount = input.baseAmount + tipAmount;
  if (!Number.isSafeInteger(tipAmount) || tipAmount < 0 || !Number.isSafeInteger(totalAmount) || totalAmount <= 0) return null;
  return { type: option.percentage === 0 ? "none" : "percentage", optionId, percentage: option.percentage, baseAmount: input.baseAmount, tipAmount, totalAmount, currency: input.currency };
}

export function isValidTipSelection(selection: TipSelection, baseAmount: number) {
  const expected = createTipSelection({ baseAmount, currency: "ARS" }, selection.optionId);
  return Boolean(expected && expected.percentage === selection.percentage && expected.tipAmount === selection.tipAmount && expected.totalAmount === selection.totalAmount);
}
