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
  sessionId?: string;
  billId?: string;
}

export const accountData: AccountData = {
  restaurant: "Alma de Pueblo",
  table: "Mesa 12",
  status: "open",
  lastUpdated: "23:42 hs",
  paymentEnabled: true,
  items: [
    { id: "panini-alma", name: "Panini del Alma", quantity: 1, unitPrice: 19000 },
    { id: "ojo-bife", name: "Ojo de bife con hueso", quantity: 2, unitPrice: 34000 },
    { id: "copa-malbec", name: "Copa Las Perdices Malbec", quantity: 2, unitPrice: 6000 },
    { id: "tiramisu", name: "Tiramisú clásico", quantity: 1, unitPrice: 12000 },
  ],
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
