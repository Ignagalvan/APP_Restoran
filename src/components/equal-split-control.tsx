import { CheckCircle2, Clock3, Minus, Plus, ReceiptText, Users } from "lucide-react";

import { formatCurrency } from "@/lib/account-data";
import type { EqualPart } from "@/lib/collaborative-session";

interface EqualSplitControlProps {
  people: number;
  amount: number;
  confirmed: boolean;
  parts: EqualPart[];
  selectedPartId: string | null;
  onChange: (people: number) => void;
  onConfirm: () => void;
  onSelectPart: (partId: string) => void;
}

const partLabel = {
  available: "Disponible",
  selected_by_me: "Tu parte",
  paying: "En proceso",
  paid: "Pagada",
};

export function EqualSplitControl({ people, amount, confirmed, parts, selectedPartId, onChange, onConfirm, onSelectPart }: EqualSplitControlProps) {
  return (
    <section id="split-panel-equal" className="space-y-4" role="tabpanel" aria-labelledby="split-tab-equal">
      <div>
        <h2 id="equal-title" className="font-display text-3xl font-semibold">Entre cuantos?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Confirmas la cantidad y despues tomas una parte disponible.</p>
      </div>
      <div className="split-equal-card">
        <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><Users className="size-6" /></span>
        <div className="split-large-stepper" aria-label="Cantidad de personas">
          <button type="button" onClick={() => onChange(people - 1)} disabled={people === 2} aria-label="Quitar una persona"><Minus className="size-5" /></button>
          <output aria-live="polite"><strong>{people}</strong><span>personas</span></output>
          <button type="button" onClick={() => onChange(people + 1)} disabled={people === 10} aria-label="Agregar una persona"><Plus className="size-5" /></button>
        </div>
        <div className="w-full border-t border-foreground/10 pt-4 text-center">
          <p className="text-xs text-muted-foreground">Parte sugerida</p>
          <p className="mt-1 font-display text-4xl font-semibold">{formatCurrency(amount)}</p>
        </div>
        <button type="button" className="split-confirm-people" data-confirmed={confirmed} aria-pressed={confirmed} onClick={onConfirm}>{confirmed ? `${people} personas confirmadas` : `Confirmar ${people} personas`}</button>
      </div>

      {confirmed ? (
        <div className="split-parts-card">
          <div>
            <h3 className="text-sm font-semibold">Partes de la cuenta</h3>
            <p className="mt-1 text-xs text-muted-foreground">La ultima parte ajusta el redondeo para que el total cierre exacto.</p>
          </div>
          <div className="split-part-list">
            {parts.map((part) => {
              const blocked = part.status === "paid" || part.status === "paying";
              const Icon = part.status === "paid" ? ReceiptText : part.status === "paying" ? Clock3 : part.status === "selected_by_me" ? CheckCircle2 : Users;

              return (
                <button
                  key={part.id}
                  type="button"
                  className="split-part"
                  data-status={part.status}
                  disabled={blocked}
                  aria-pressed={selectedPartId === part.id}
                  onClick={() => onSelectPart(part.id)}
                >
                  <span className="split-part-icon"><Icon className="size-4" /></span>
                  <span className="min-w-0 flex-1 text-left">
                    <strong>Parte {part.index}</strong>
                    <small>{partLabel[part.status]}{part.holderLabel ? ` por ${part.holderLabel}` : ""}</small>
                  </span>
                  <span className="text-sm font-bold">{formatCurrency(part.amount)}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
