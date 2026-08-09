import type { RestaurantOsData } from "@/server/domain/models";

const now = new Date().toISOString();

export const demoData: RestaurantOsData = {
  restaurants: [
    {
      id: "rst_alma_de_pueblo",
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
      id: "tbl_alma_de_pueblo_12",
      restaurantId: "rst_alma_de_pueblo",
      externalTableId: "mesa-12",
      label: "Mesa 12",
      qrCode: "alma-de-pueblo-mesa-12",
      status: "occupied",
      createdAt: now,
      updatedAt: now,
    },
  ],
  sessions: [
    {
      id: "ses_alma_de_pueblo_12_active",
      restaurantId: "rst_alma_de_pueblo",
      tableId: "tbl_alma_de_pueblo_12",
      externalTicketId: "ticket-demo-001",
      status: "active",
      openedAt: now,
    },
  ],
  accounts: [
    {
      id: "acc_alma_de_pueblo_12_active",
      restaurantId: "rst_alma_de_pueblo",
      sessionId: "ses_alma_de_pueblo_12_active",
      externalAccountId: "ticket-demo-001",
      subtotal: 27600,
      discounts: 0,
      tip: 0,
      total: 27600,
      paidTotal: 0,
      status: "open",
      paymentEnabled: false,
      lastSyncedAt: now,
    },
  ],
  accountItems: [
    {
      id: "itm_demo_1",
      restaurantId: "rst_alma_de_pueblo",
      accountId: "acc_alma_de_pueblo_12_active",
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
      restaurantId: "rst_alma_de_pueblo",
      accountId: "acc_alma_de_pueblo_12_active",
      externalItemId: "ext_item_2",
      name: "Ojo de bife con hueso",
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
      id: "int_alma_de_pueblo_external",
      restaurantId: "rst_alma_de_pueblo",
      provider: "external_pos_demo",
      status: "connected",
      endpoint: "https://example.com/pos/alma-de-pueblo",
      createdAt: now,
      updatedAt: now,
    },
  ],
};
