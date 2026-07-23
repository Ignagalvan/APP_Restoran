export type IntegrationMode = "external" | "manual" | "owned_pos";
export type IntegrationStatus = "not_configured" | "connected" | "degraded" | "disabled";
export type TableStatus = "available" | "occupied" | "paying" | "closed" | "inactive";
export type SessionStatus = "active" | "paying" | "closed" | "cancelled";
export type AccountStatus = "open" | "partially_paid" | "paid" | "closed";
export type AccountItemStatus = "active" | "cancelled" | "comped";
export type PaymentStatus = "pending" | "approved" | "rejected" | "cancelled" | "refunded";
export type SplitType = "equal_parts" | "by_items" | "free_amount";
export type SplitPartStatus = "pending" | "paid";
export type FeedbackSentiment = "positive" | "neutral" | "negative";
export type FeedbackReviewStatus = "new" | "reviewed" | "archived";

export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  integrationMode: IntegrationMode;
  integrationStatus: IntegrationStatus;
  createdAt: string;
  updatedAt: string;
};

export type RestaurantTable = {
  id: string;
  restaurantId: string;
  externalTableId?: string;
  label: string;
  qrCode: string;
  status: TableStatus;
  createdAt: string;
  updatedAt: string;
};

export type TableSession = {
  id: string;
  restaurantId: string;
  tableId: string;
  externalTicketId?: string;
  status: SessionStatus;
  openedAt: string;
  closedAt?: string;
};

export type Account = {
  id: string;
  restaurantId: string;
  sessionId: string;
  externalAccountId?: string;
  subtotal: number;
  discounts: number;
  tip: number;
  total: number;
  paidTotal: number;
  status: AccountStatus;
  lastSyncedAt: string;
};

export type AccountItem = {
  id: string;
  restaurantId: string;
  accountId: string;
  externalItemId?: string;
  name: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  status: AccountItemStatus;
};

export type PartialPayment = {
  id: string;
  restaurantId: string;
  accountId: string;
  sessionId: string;
  amount: number;
  method: string;
  provider: string;
  status: PaymentStatus;
  externalTransactionId?: string;
  createdAt: string;
  confirmedAt?: string;
};

export type BillSplitPart = {
  id: string;
  participantAlias: string;
  amount: number;
  itemIds: string[];
  status: SplitPartStatus;
};

export type BillSplit = {
  id: string;
  restaurantId: string;
  accountId: string;
  type: SplitType;
  parts: BillSplitPart[];
  createdAt: string;
  updatedAt: string;
};

export type Feedback = {
  id: string;
  restaurantId: string;
  sessionId: string;
  accountId?: string;
  rating: number;
  comment?: string;
  tags: string[];
  sentiment: FeedbackSentiment;
  reviewStatus: FeedbackReviewStatus;
  createdAt: string;
};

export type ExternalIntegrationConfig = {
  id: string;
  restaurantId: string;
  provider: string;
  status: IntegrationStatus;
  endpoint?: string;
  webhookSecretRef?: string;
  lastSyncedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type RestaurantOsData = {
  restaurants: Restaurant[];
  tables: RestaurantTable[];
  sessions: TableSession[];
  accounts: Account[];
  accountItems: AccountItem[];
  payments: PartialPayment[];
  billSplits: BillSplit[];
  feedback: Feedback[];
  integrations: ExternalIntegrationConfig[];
};
