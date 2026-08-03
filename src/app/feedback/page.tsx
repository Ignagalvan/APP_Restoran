import type { Metadata } from "next";

import { FeedbackPage } from "@/components/feedback-page";

export const metadata: Metadata = { title: "Tu experiencia — Alma de Pueblo", description: "Feedback simulado de Restaurant OS" };

export default function FeedbackRoute() { return <FeedbackPage />; }
