import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "restaurant-os",
    status: "Demo Funcional del Flujo QR -> MVP Tecnico",
  });
}
