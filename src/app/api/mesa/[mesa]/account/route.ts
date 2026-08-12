import { NextResponse } from "next/server";

import { getAccountForMesa } from "@/lib/get-table-account";

export async function GET(_request: Request, { params }: { params: Promise<{ mesa: string }> }) {
  const { mesa } = await params;
  const account = await getAccountForMesa(mesa);

  return NextResponse.json(account, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
