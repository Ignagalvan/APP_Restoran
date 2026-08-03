import type { RestaurantOsData } from "@/server/domain/models";

const now = new Date().toISOString();

export const demoData: RestaurantOsData = {
  restaurants: [
    {
      id: "rst_lumbre",
      name: "Alma de Pueblo",
      slug: "alma-de-pueblo",
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
      subtotal: 24300,
      discounts: 0,
      tip: 0,
      total: 24300,
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
      name: "Provoleta al hierro",
      category: "Antipasti",
      quantity: 1,
      unitPrice: 9800,
      total: 9800,
      status: "active",
    },
    {
      id: "itm_demo_2",
      restaurantId: "rst_lumbre",
      accountId: "acc_lumbre_12_active",
      externalItemId: "ext_item_2",
      name: "Ravioles de calabaza",
      category: "Pastas y platos",
      quantity: 1,
      unitPrice: 14500,
      total: 14500,
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
      endpoint: "https://example.com/pos/alma-de-pueblo",
      createdAt: now,
      updatedAt: now,
    },
  ],
};
