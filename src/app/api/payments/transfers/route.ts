import { NextResponse } from "next/server";

import { getRepository } from "@/server/storage/get-repository";

export async function GET() {
  const data = await getRepository().getSnapshot();
  const payments = data.payments
    .filter((payment) => payment.provider === "bank_transfer")
    .map((payment) => ({
      ...payment,
      table: data.tables.find((table) => data.sessions.find((session) => session.id === payment.sessionId)?.tableId === table.id)?.label ?? "Mesa",
    }))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ payments });
}
