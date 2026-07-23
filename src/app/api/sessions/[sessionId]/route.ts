import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";

export async function GET(_request: Request, context: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await context.params;
  const snapshot = await getRepository().getSnapshot();
  const session = snapshot.sessions.find((candidate) => candidate.id === sessionId);

  if (!session) {
    return NextResponse.json({ error: "SESSION_NOT_FOUND" }, { status: 404 });
  }

  const account = snapshot.accounts.find((candidate) => candidate.sessionId === session.id) ?? null;
  const items = account ? snapshot.accountItems.filter((item) => item.accountId === account.id) : [];
  const payments = account ? snapshot.payments.filter((payment) => payment.accountId === account.id) : [];
  const split = account ? snapshot.billSplits.find((candidate) => candidate.accountId === account.id) ?? null : null;

  return NextResponse.json({ session, account, items, payments, split });
}
