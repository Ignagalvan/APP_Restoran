import type {
  Account,
  AccountItem,
  Feedback,
  PartialPayment,
  Restaurant,
  RestaurantOsData,
  RestaurantTable,
  TableSession,
} from "@/server/domain/models";

export type SyncExternalTicketInput = {
  restaurantId: string;
  externalTableId: string;
  externalTicketId: string;
  externalAccountId?: string;
  items: Array<{
    externalItemId?: string;
    name: string;
    category?: string;
    quantity: number;
    unitPrice: number;
    status?: AccountItem["status"];
  }>;
};

export type CreatePaymentInput = {
  accountId: string;
  amount: number;
  method: string;
  provider: string;
  status?: PartialPayment["status"];
  externalTransactionId?: string;
};

export type UpdateProviderPaymentInput = {
  paymentId?: string;
  provider: string;
  externalTransactionId: string;
  status: PartialPayment["status"];
  method?: string;
  confirmedAt?: string;
};

export type CreateFeedbackInput = {
  sessionId: string;
  accountId?: string;
  rating: number;
  comment?: string;
  tags?: string[];
};

export interface RestaurantOsRepository {
  getSnapshot(): Promise<RestaurantOsData>;
  listRestaurants(): Promise<Restaurant[]>;
  listTables(): Promise<RestaurantTable[]>;
  findTableByQrCode(qrCode: string): Promise<RestaurantTable | null>;
  getActiveSessionByTable(tableId: string): Promise<TableSession | null>;
  getAccountBySession(sessionId: string): Promise<Account | null>;
  syncExternalTicket(input: SyncExternalTicketInput): Promise<{
    table: RestaurantTable;
    session: TableSession;
    account: Account;
    items: AccountItem[];
  }>;
  createPayment(input: CreatePaymentInput): Promise<PartialPayment>;
  updateProviderPayment(input: UpdateProviderPaymentInput): Promise<PartialPayment>;
  createFeedback(input: CreateFeedbackInput): Promise<Feedback>;
}
