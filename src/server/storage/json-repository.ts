import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  Account,
  AccountItem,
  Feedback,
  PartialPayment,
  RestaurantOsData,
} from "@/server/domain/models";
import { demoData } from "@/server/seed/demo-data";
import type {
  CreateFeedbackInput,
  CreatePaymentInput,
  RestaurantOsRepository,
  SyncExternalTicketInput,
  UpdateProviderPaymentInput,
} from "./repository";

const storePath = path.join(process.cwd(), "data", "store.json");

function now() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

async function ensureStore() {
  await fs.mkdir(path.dirname(storePath), { recursive: true });

  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(demoData, null, 2), "utf8");
  }
}

async function readStore(): Promise<RestaurantOsData> {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw) as RestaurantOsData;
}

async function writeStore(data: RestaurantOsData) {
  await fs.writeFile(storePath, JSON.stringify(data, null, 2), "utf8");
}

function calculateAccountStatus(total: number, paidTotal: number): Account["status"] {
  if (paidTotal <= 0) return "open";
  if (paidTotal < total) return "partially_paid";
  return "paid";
}

export class JsonRestaurantOsRepository implements RestaurantOsRepository {
  async getSnapshot() {
    return readStore();
  }

  async listRestaurants() {
    const data = await readStore();
    return data.restaurants;
  }

  async listTables() {
    const data = await readStore();
    return data.tables;
  }

  async findTableByQrCode(qrCode: string) {
    const data = await readStore();
    return data.tables.find((table) => table.qrCode === qrCode) ?? null;
  }

  async getActiveSessionByTable(tableId: string) {
    const data = await readStore();
    return data.sessions.find((session) => session.tableId === tableId && session.status === "active") ?? null;
  }

  async getAccountBySession(sessionId: string) {
    const data = await readStore();
    return data.accounts.find((account) => account.sessionId === sessionId) ?? null;
  }

  async syncExternalTicket(input: SyncExternalTicketInput) {
    const data = await readStore();
    const table = data.tables.find(
      (candidate) =>
        candidate.restaurantId === input.restaurantId && candidate.externalTableId === input.externalTableId,
    );

    if (!table) {
      throw new Error("TABLE_NOT_FOUND");
    }

    table.status = "occupied";
    table.updatedAt = now();

    let session = data.sessions.find(
      (candidate) => candidate.tableId === table.id && candidate.status === "active",
    );

    if (!session) {
      session = {
        id: createId("ses"),
        restaurantId: input.restaurantId,
        tableId: table.id,
        externalTicketId: input.externalTicketId,
        status: "active",
        openedAt: now(),
      };
      data.sessions.push(session);
    } else {
      session.externalTicketId = input.externalTicketId;
    }

    let account = data.accounts.find((candidate) => candidate.sessionId === session.id);
    const syncedItems: AccountItem[] = input.items.map((item) => {
      const quantity = Number(item.quantity);
      const unitPrice = Number(item.unitPrice);

      return {
        id: createId("itm"),
        restaurantId: input.restaurantId,
        accountId: account?.id ?? "pending",
        externalItemId: item.externalItemId,
        name: item.name,
        category: item.category,
        quantity,
        unitPrice,
        total: quantity * unitPrice,
        status: item.status ?? "active",
      };
    });
    const subtotal = syncedItems
      .filter((item) => item.status === "active")
      .reduce((total, item) => total + item.total, 0);

    if (!account) {
      account = {
        id: createId("acc"),
        restaurantId: input.restaurantId,
        sessionId: session.id,
        externalAccountId: input.externalAccountId ?? input.externalTicketId,
        subtotal,
        discounts: 0,
        tip: 0,
        total: subtotal,
        paidTotal: 0,
        status: "open",
        lastSyncedAt: now(),
      };
      data.accounts.push(account);
    } else {
      account.externalAccountId = input.externalAccountId ?? input.externalTicketId;
      account.subtotal = subtotal;
      account.total = subtotal - account.discounts + account.tip;
      account.status = calculateAccountStatus(account.total, account.paidTotal);
      account.lastSyncedAt = now();
    }

    const items = syncedItems.map((item) => ({ ...item, accountId: account.id }));
    data.accountItems = data.accountItems.filter((item) => item.accountId !== account.id);
    data.accountItems.push(...items);

    await writeStore(data);
    return { table, session, account, items };
  }

  async createPayment(input: CreatePaymentInput) {
    const data = await readStore();
    const account = data.accounts.find((candidate) => candidate.id === input.accountId);

    if (!account) {
      throw new Error("ACCOUNT_NOT_FOUND");
    }

    const payment: PartialPayment = {
      id: createId("pay"),
      restaurantId: account.restaurantId,
      accountId: account.id,
      sessionId: account.sessionId,
      amount: Number(input.amount),
      method: input.method,
      provider: input.provider,
      status: input.status ?? "pending",
      externalTransactionId: input.externalTransactionId,
      createdAt: now(),
      confirmedAt: input.status === "approved" ? now() : undefined,
    };

    data.payments.push(payment);

    if (payment.status === "approved") {
      account.paidTotal += payment.amount;
      account.status = calculateAccountStatus(account.total, account.paidTotal);
    }

    await writeStore(data);
    return payment;
  }

  async updateProviderPayment(input: UpdateProviderPaymentInput) {
    const data = await readStore();
    const payment = data.payments.find(
      (candidate) =>
        candidate.provider === input.provider &&
        (candidate.id === input.paymentId || candidate.externalTransactionId === input.externalTransactionId),
    );

    if (!payment) {
      throw new Error("PAYMENT_NOT_FOUND");
    }

    const account = data.accounts.find((candidate) => candidate.id === payment.accountId);

    if (!account) {
      throw new Error("ACCOUNT_NOT_FOUND");
    }

    const wasApproved = payment.status === "approved";
    payment.status = input.status;
    payment.method = input.method ?? payment.method;
    payment.externalTransactionId = input.externalTransactionId;
    payment.confirmedAt = input.confirmedAt ?? (input.status === "approved" ? now() : payment.confirmedAt);

    if (!wasApproved && payment.status === "approved") {
      account.paidTotal += payment.amount;
    }

    account.status = calculateAccountStatus(account.total, account.paidTotal);

    await writeStore(data);
    return payment;
  }

  async createFeedback(input: CreateFeedbackInput) {
    const data = await readStore();
    const session = data.sessions.find((candidate) => candidate.id === input.sessionId);

    if (!session) {
      throw new Error("SESSION_NOT_FOUND");
    }

    const rating = Number(input.rating);
    const feedback: Feedback = {
      id: createId("fbk"),
      restaurantId: session.restaurantId,
      sessionId: session.id,
      accountId: input.accountId,
      rating,
      comment: input.comment,
      tags: input.tags ?? [],
      sentiment: rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral",
      reviewStatus: "new",
      createdAt: now(),
    };

    data.feedback.push(feedback);
    await writeStore(data);
    return feedback;
  }
}
