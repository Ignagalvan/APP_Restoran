import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";

export async function GET() {
  const tables = await getRepository().listTables();
  return NextResponse.json({ tables });
}
