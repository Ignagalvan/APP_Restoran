import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";

export async function GET(_request: Request, context: { params: Promise<{ qrCode: string }> }) {
  const { qrCode } = await context.params;
  const repository = getRepository();
  const table = await repository.findTableByQrCode(qrCode);

  if (!table) {
    return NextResponse.json({ error: "TABLE_NOT_FOUND" }, { status: 404 });
  }

  const session = await repository.getActiveSessionByTable(table.id);
  const account = session ? await repository.getAccountBySession(session.id) : null;

  return NextResponse.json({ table, session, account });
}
