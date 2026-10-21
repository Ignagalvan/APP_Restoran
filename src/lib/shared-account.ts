export type SharedAccountState = {
  sessionId: string;
  billId: string;
  version: number;
  tableLabel: string;
  totalCents: number;
  paidCents: number;
  pendingCents: number;
  requested: boolean;
  closed: boolean;
  active: boolean;
  stale: boolean;
  mode: "EQUAL" | "AMOUNTS" | "ITEMS" | null;
  myPartId: string | null;
  unassignedCents: number;
  units: {
    id: string;
    name: string;
    amountCents: number;
    partIds: string[];
    shared: boolean;
  }[];
  parts: {
    id: string;
    label: string;
    amountCents: number;
    paidCents: number;
    pendingCents: number;
    preferredMethod: "CASH" | "POSNET" | "TRANSFER" | null;
    claimed: boolean;
    locked: boolean;
    state: "UNPAID" | "VERIFYING" | "PARTIAL" | "PAID";
  }[];
};
export type SharedAccountCommand = {
  action:
    | "setup"
    | "add-person"
    | "assign"
    | "claim"
    | "preference"
    | "request"
    | "cancel";
  mode?: "EQUAL" | "AMOUNTS" | "ITEMS";
  count?: number;
  label?: string;
  partId?: string;
  unitId?: string;
  partIds?: string[];
  unitIds?: string[];
  amounts?: number[];
  method?: "CASH" | "POSNET" | "TRANSFER";
};
