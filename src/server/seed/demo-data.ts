import type { RestaurantOsData } from "@/server/domain/models";

const now = new Date().toISOString();

export const demoData: RestaurantOsData = {
  restaurants: [
    {
      id: "rst_lumbre",
      name: "Lumbre",
      slug: "lumbre",
      integrationMode: "external",
      integrationStatus: "connected",
      createdAt: now,
      updatedAt: now,
    },
  ],
  tables: [
    {
      id: "tbl_lumbre_12",
      restaurantId: "rst_lumbre",
      externalTableId: "mesa-12",
      label: "Mesa 12",
      qrCode: "lumbre-mesa-12",
      status: "occupied",
      createdAt: now,
      updatedAt: now,
    },
  ],
  sessions: [
    {
      id: "ses_lumbre_12_active",
      restaurantId: "rst_lumbre",
      tableId: "tbl_lumbre_12",
      externalTicketId: "ticket-demo-001",
      status: "active",
      openedAt: now,
    },
  ],
  accounts: [
    {
      id: "acc_lumbre_12_active",
      restaurantId: "rst_lumbre",
      sessionId: "ses_lumbre_12_active",
      externalAccountId: "ticket-demo-001",
      subtotal: 27600,
      discounts: 0,
      tip: 0,
      total: 27600,
      paidTotal: 0,
      status: "open",
      lastSyncedAt: now,
    },
  ],
  accountItems: [
    {
      id: "itm_demo_1",
      restaurantId: "rst_lumbre",
      accountId: "acc_lumbre_12_active",
      externalItemId: "ext_item_1",
      name: "Empanadas de osobuco",
      category: "Entradas",
      quantity: 2,
      unitPrice: 4200,
      total: 8400,
      status: "active",
    },
    {
      id: "itm_demo_2",
      restaurantId: "rst_lumbre",
      accountId: "acc_lumbre_12_active",
      externalItemId: "ext_item_2",
      name: "Ojo de bife",
      category: "Principales",
      quantity: 1,
      unitPrice: 19200,
      total: 19200,
      status: "active",
    },
  ],
  payments: [],
  billSplits: [],
  feedback: [],
  integrations: [
    {
      id: "int_lumbre_external",
      restaurantId: "rst_lumbre",
      provider: "external_pos_demo",
      status: "connected",
      endpoint: "https://example.com/pos/lumbre",
      createdAt: now,
      updatedAt: now,
    },
  ],
};
