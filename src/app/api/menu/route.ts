import { NextResponse } from "next/server";

import { getMenuCategories } from "@/lib/remote-menu";

export async function GET() {
  const categories = await getMenuCategories();

  return NextResponse.json(categories, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
