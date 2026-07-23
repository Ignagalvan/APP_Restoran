import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function FeedbackUnavailableState({ homePath = "/" }: { homePath?: string }) {
  return (
    <section className="feedback-state-card" aria-labelledby="feedback-unavailable-title">
      <div className="feedback-muted-mark"><ArrowLeft className="size-6" /></div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-primary">Experiencia no disponible</p>
      <h2 id="feedback-unavailable-title" className="mt-2 font-display text-4xl font-semibold">Volvamos al inicio</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">No encontramos el contexto de tu mesa para registrar la opinión en esta simulación.</p>
      <Button asChild size="hero" className="mt-7 w-full justify-between text-primary-foreground!">
        <Link href={homePath}><span>Ir a Home</span><Home className="size-5" /></Link>
      </Button>
    </section>
  );
}
