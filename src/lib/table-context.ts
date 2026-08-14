import { accountData, type AccountData } from "@/lib/account-data";

export interface TableRouteContext {
  tableCode: string;
  tableNumber: string;
  tableLabel: string;
  basePath: string;
}

export function getTableRouteContext(rawTable: string, tableLabel?: string): TableRouteContext {
  const tableCode = rawTable.trim();
  return {
    tableCode,
    tableNumber: tableCode,
    tableLabel: tableLabel ?? "Mesa",
    basePath: `/mesa/${encodeURIComponent(tableCode)}`,
  };
}

export function getAccountForTable(tableLabel = accountData.table): AccountData {
  return { ...accountData, table: tableLabel };
}
