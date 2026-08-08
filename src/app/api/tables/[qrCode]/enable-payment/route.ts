import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";

export async function POST(request: Request, context: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await context.params;
  const body = await request.json().catch(() => null);
  const enabled = typeof body?.enabled === "boolean" ? body.enabled : true;

  const repository = getRepository();
  const table = await repository.findTableByQrCode(qrCode);

  if (!table) {
    return NextResponse.json({ error: "TABLE_NOT_FOUND" }, { status: 404 });
  }

  const session = await repository.getActiveSessionByTable(table.id);
  if (!session) {
    return NextResponse.json({ error: "SESSION_NOT_FOUND" }, { status: 404 });
  }

  const account = await repository.getAccountBySession(session.id);
  if (!account) {
    return NextResponse.json({ error: "ACCOUNT_NOT_FOUND" }, { status: 404 });
  }

  const updated = await repository.setAccountPaymentEnabled(account.id, enabled);
  return NextResponse.json({ account: updated });
}
