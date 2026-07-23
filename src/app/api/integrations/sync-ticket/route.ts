import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";
import type { SyncExternalTicketInput } from "@/server/storage/repository";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as SyncExternalTicketInput;
    const result = await getRepository().syncExternalTicket(input);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "SYNC_FAILED";
    const status = message === "TABLE_NOT_FOUND" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
