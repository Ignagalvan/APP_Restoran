"use client";

import { Star } from "lucide-react";

import type { FeedbackRating } from "@/lib/feedback-data";

const ratings: FeedbackRating[] = [1, 2, 3, 4, 5];

interface RatingSelectorProps {
  value: FeedbackRating | null;
  disabled?: boolean;
  onChange: (rating: FeedbackRating) => void;
}

export function RatingSelector({ value, disabled = false, onChange }: RatingSelectorProps) {
  return (
    <fieldset className="feedback-rating" aria-describedby="feedback-rating-help">
      <legend className="font-display text-3xl font-semibold">¿Cómo estuvo tu experiencia?</legend>
      <p id="feedback-rating-help" className="mt-2 text-sm text-muted-foreground">Elegí una calificación. Te lleva solo unos segundos.</p>
      <div className="mt-5 flex justify-between gap-2" role="radiogroup" aria-label="Calificación de la experiencia">
        {ratings.map((rating) => {
          const selected = value === rating;
          const filled = value !== null && rating <= value;
          return (
            <label key={rating} className="rating-option" data-selected={selected} data-filled={filled} data-disabled={disabled}>
              <input className="sr-only" type="radio" name="feedback-rating" value={rating} checked={selected} disabled={disabled} onChange={() => onChange(rating)} />
              <Star className="size-7" aria-hidden="true" fill={filled ? "currentColor" : "none"} />
              <span className="sr-only">{rating} de 5 estrellas</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
