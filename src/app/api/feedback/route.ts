import { NextResponse } from "next/server";
import { getRepository } from "@/server/storage/get-repository";
import type { CreateFeedbackInput } from "@/server/storage/repository";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as CreateFeedbackInput;
    const feedback = await getRepository().createFeedback(input);
    return NextResponse.json({ feedback }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "FEEDBACK_FAILED";
    const status = message === "SESSION_NOT_FOUND" ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
