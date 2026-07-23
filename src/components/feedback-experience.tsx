"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { FeedbackSuccessState } from "@/components/feedback-success-state";
import { FeedbackUnavailableState } from "@/components/feedback-unavailable-state";
import { RatingSelector } from "@/components/rating-selector";
import { Button } from "@/components/ui/button";
import { useFeedbackFlow } from "@/components/feedback-flow-context";
import { createFeedbackResult, feedbackCommentMaxLength, normalizeFeedbackContext, type FeedbackContextData, type FeedbackRating, type FeedbackResultData } from "@/lib/feedback-data";
import { getGoogleReviewUrl } from "@/lib/google-review";

type FeedbackStatus = "editing" | "submitting" | "success" | "error";

export function FeedbackExperience({ homePath = "/", fallbackContext = null }: { homePath?: string; fallbackContext?: FeedbackContextData | null }) {
  const { context, clearContext } = useFeedbackFlow();
  const normalizedContext = normalizeFeedbackContext(context ?? fallbackContext);
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<FeedbackStatus>("editing");
  const [result, setResult] = useState<FeedbackResultData | null>(null);
  const submitting = useRef(false);
  const shouldFailOnce = useRef(false);
  const stateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shouldFailOnce.current = new URLSearchParams(window.location.search).get("simulateError") === "1";
  }, []);

  useEffect(() => {
    if (status === "success" || status === "error") stateRef.current?.focus();
  }, [status]);

  if (status === "success" && result) return <FeedbackSuccessState result={result} homePath={homePath} />;
  if (!normalizedContext) return <FeedbackUnavailableState homePath={homePath} />;

  const ready = rating !== null && status !== "submitting";
  const charactersLeft = feedbackCommentMaxLength - comment.length;

  const submitFeedback = () => {
    if (!ready || submitting.current) return;
    submitting.current = true;
    setStatus("submitting");
    window.setTimeout(() => {
      if (shouldFailOnce.current) {
        shouldFailOnce.current = false;
        submitting.current = false;
        setStatus("error");
        return;
      }

      const nextResult = createFeedbackResult(normalizedContext, rating, comment);
      if (!nextResult) {
        submitting.current = false;
        setStatus("error");
        return;
      }

      setResult(nextResult);
      clearContext();
      setStatus("success");
      window.setTimeout(() => {
        window.location.assign(getGoogleReviewUrl());
      }, 650);
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 520);
  };

  return (
    <section className="feedback-content" aria-labelledby="feedback-form-title" aria-busy={status === "submitting"}>
      <div className="feedback-card">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">{normalizedContext.table}</p>
        <h2 id="feedback-form-title" className="mt-2 font-display text-[2.7rem] font-semibold leading-[.9] tracking-[-.035em]">Tu opinión importa</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Un cierre breve para ayudarnos a mejorar la experiencia.</p>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/65 bg-white/62 p-4 shadow-[0_18px_45px_-34px_var(--shadow-ink)] backdrop-blur-xl">
        <RatingSelector value={rating} disabled={status === "submitting"} onChange={(value) => { setRating(value); setStatus("editing"); }} />
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-white/65 bg-white/58 p-4 shadow-[0_16px_42px_-36px_var(--shadow-ink)] backdrop-blur-xl">
        <label htmlFor="feedback-comment" className="font-display text-2xl font-semibold">Comentario opcional</label>
        <p className="mt-1 text-sm text-muted-foreground">Si querés, contanos algo puntual.</p>
        <textarea id="feedback-comment" className="feedback-textarea" maxLength={feedbackCommentMaxLength} value={comment} disabled={status === "submitting"} onChange={(event) => { setComment(event.target.value); setStatus("editing"); }} placeholder="Escribí tu opinión en una frase..." aria-describedby="feedback-comment-count" />
        <p id="feedback-comment-count" className="mt-2 text-right text-xs text-muted-foreground">{charactersLeft} caracteres disponibles</p>
      </div>

      <div ref={stateRef} tabIndex={-1}>
        {status === "error" ? <p className="mt-4 rounded-xl border border-primary/20 bg-primary/6 p-3 text-sm text-primary" role="alert">No pudimos completar el envío simulado. Tu opinión sigue acá para que puedas intentarlo nuevamente.</p> : null}
      </div>

      <div className="feedback-sticky">
        <Button size="hero" className="w-full justify-between disabled:cursor-not-allowed disabled:bg-foreground/12 disabled:text-muted-foreground disabled:opacity-70 disabled:shadow-none" disabled={!ready} onClick={submitFeedback}>
          <span>{status === "submitting" ? "Enviando..." : "Enviar opinión"}</span>
          {status === "submitting" ? <LoaderCircle className="size-5 animate-spin" /> : <ArrowRight className="size-5" />}
        </Button>
        {status === "submitting" ? (
          <Button variant="glass" size="default" className="mt-3 w-full disabled:cursor-not-allowed disabled:opacity-60" disabled>Omitir</Button>
        ) : (
          <Button asChild variant="glass" size="default" className="mt-3 w-full">
            <Link href={homePath} onClick={clearContext}>Omitir</Link>
          </Button>
        )}
        <p className="mt-2 min-h-5 text-center text-xs text-muted-foreground" role="status" aria-live="polite">{rating === null ? "Elegí una calificación para enviar." : status === "submitting" ? "Estamos enviando la opinión simulada." : "Podés omitir este paso si preferís."}</p>
      </div>
    </section>
  );
}
