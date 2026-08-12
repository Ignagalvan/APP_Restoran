export interface AccountItemData {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface AccountData {
  restaurant: string;
  table: string;
  status: "open";
  lastUpdated: string;
  items: AccountItemData[];
  paymentEnabled: boolean;
  consumptionEnabled: boolean;
  sessionId?: string;
  billId?: string;
}

export const accountData: AccountData = {
  restaurant: "Alma de Pueblo",
  table: "Mesa 12",
  status: "open",
  lastUpdated: "--",
  paymentEnabled: false,
  consumptionEnabled: false,
  items: [],
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
