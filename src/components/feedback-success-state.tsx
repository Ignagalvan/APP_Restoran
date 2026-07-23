import { Check, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { FeedbackResultData } from "@/lib/feedback-data";

export function FeedbackSuccessState({ result, homePath = "/" }: { result: FeedbackResultData; homePath?: string }) {
  return (
    <section className="feedback-state-card" aria-labelledby="feedback-success-title" tabIndex={-1}>
      <div className="feedback-success-mark"><Check className="size-7" /></div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-status">Opinión enviada</p>
      <h2 id="feedback-success-title" className="mt-2 font-display text-4xl font-semibold">Gracias por compartirlo</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Tu experiencia nos ayuda a seguir cuidando cada detalle en {result.restaurant}.</p>
      <div className="mt-6 rounded-2xl border border-foreground/8 bg-white/50 p-4 text-sm">
        <p className="text-muted-foreground">Calificación</p>
        <p className="mt-1 text-2xl font-semibold" aria-label={`${result.rating} de 5 estrellas`}>{"★".repeat(result.rating)}<span className="text-muted-foreground/30">{"★".repeat(5 - result.rating)}</span></p>
      </div>
      <Button asChild size="hero" className="mt-7 w-full justify-between text-primary-foreground!">
        <Link href={homePath}><span>Volver al inicio</span><Home className="size-5" /></Link>
      </Button>
    </section>
  );
}
