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
}

export const accountData: AccountData = {
  restaurant: "Alma de Pueblo",
  table: "Mesa 12",
  status: "open",
  lastUpdated: "23:42 hs",
  items: [
    { id: "empanada-cordero", name: "Empanada de Cordero", quantity: 2, unitPrice: 4200 },
    { id: "caserecce-cacio-pepe", name: "Caserecce Cacio e Pepe alla Ruota", quantity: 1, unitPrice: 29000 },
    { id: "milanesa-alma", name: "Milanesa del Alma", quantity: 1, unitPrice: 35000 },
    { id: "tiramisu-clasico", name: "Tiramisu clasico", quantity: 1, unitPrice: 12000 },
  ],
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
