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
    { id: "provoleta", name: "Provoleta al hierro", quantity: 1, unitPrice: 9800 },
    { id: "ravioles", name: "Ravioles de calabaza", quantity: 2, unitPrice: 14500 },
    { id: "malbec", name: "Malbec copa", quantity: 2, unitPrice: 5800 },
    { id: "tiramisu", name: "Tiramisu della casa", quantity: 1, unitPrice: 7100 },
  ],
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
