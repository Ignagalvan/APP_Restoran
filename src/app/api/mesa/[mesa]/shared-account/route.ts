import { NextResponse } from "next/server";
import { apiBaseUrl, restaurantSlug } from "@/lib/get-table-account";

async function proxy(
  request: Request,
  context: { params: Promise<{ mesa: string }> },
) {
  const { mesa } = await context.params;
  const url = new URL(request.url);
  const join =
    request.method === "POST" && url.searchParams.get("action") === "join";
  let body: string | undefined;
  if (request.method === "POST") {
    body = await request.text();
    if (body.length > 24000)
      return NextResponse.json(
        { message: "La selección es demasiado grande." },
        { status: 413 },
      );
    const origin = request.headers.get("origin");
    if (origin && origin !== url.origin)
      return NextResponse.json(
        { message: "Origen no permitido." },
        { status: 403 },
      );
  }
  try {
    const response = await fetch(
      `${apiBaseUrl()}/public/restaurants/${encodeURIComponent(restaurantSlug())}/tables/${encodeURIComponent(mesa)}/shared-account${join ? "/join" : ""}`,
      {
        method: request.method,
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
        headers: {
          "Content-Type": "application/json",
          "x-account-participant":
            request.headers.get("x-account-participant") ?? "",
        },
        body,
      },
    );
    const payload: unknown = await response.json();
    return NextResponse.json(payload, {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "No pudimos confirmar la conexión con la cuenta. Conservá tu selección; no vuelvas a pagar.",
      },
      { status: 503 },
    );
  }
}
export const GET = proxy;
export const POST = proxy;
