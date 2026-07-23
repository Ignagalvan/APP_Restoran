import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";

export async function GET() {
  const restaurants = await getRepository().listRestaurants();
  return NextResponse.json({ restaurants });
}
