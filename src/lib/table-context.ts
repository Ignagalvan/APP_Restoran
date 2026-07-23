import { accountData, type AccountData } from "@/lib/account-data";

export interface TableRouteContext {
  tableNumber: string;
  tableLabel: string;
  basePath: string;
}

export function getTableRouteContext(rawTable: string): TableRouteContext {
  const tableNumber = rawTable.trim() || "12";
  return {
    tableNumber,
    tableLabel: `Mesa ${tableNumber}`,
    basePath: `/mesa/${encodeURIComponent(tableNumber)}`,
  };
}

export function getAccountForTable(tableLabel = accountData.table): AccountData {
  return { ...accountData, table: tableLabel };
}
