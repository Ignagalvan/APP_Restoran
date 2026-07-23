import { Minus, Plus, Users } from "lucide-react";

import { formatCurrency } from "@/lib/account-data";

interface EqualSplitControlProps {
  people: number;
  amount: number;
  confirmed: boolean;
  onChange: (people: number) => void;
  onConfirm: () => void;
}

export function EqualSplitControl({ people, amount, confirmed, onChange, onConfirm }: EqualSplitControlProps) {
  return (
    <section id="split-panel-equal" className="space-y-4" role="tabpanel" aria-labelledby="split-tab-equal">
      <div><h2 id="equal-title" className="font-display text-3xl font-semibold">¿Entre cuántos?</h2><p className="mt-1 text-sm text-muted-foreground">Elegí entre 2 y 10 personas. Esta selección prepara una parte.</p></div>
      <div className="split-equal-card">
        <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary"><Users className="size-6" /></span>
        <div className="split-large-stepper" aria-label="Cantidad de personas">
          <button type="button" onClick={() => onChange(people - 1)} disabled={people === 2} aria-label="Quitar una persona"><Minus className="size-5" /></button>
          <output aria-live="polite"><strong>{people}</strong><span>personas</span></output>
          <button type="button" onClick={() => onChange(people + 1)} disabled={people === 10} aria-label="Agregar una persona"><Plus className="size-5" /></button>
        </div>
        <div className="w-full border-t border-foreground/10 pt-4 text-center"><p className="text-xs text-muted-foreground">Cada persona paga</p><p className="mt-1 font-display text-4xl font-semibold">{formatCurrency(amount)}</p></div>
        <button type="button" className="split-confirm-people" data-confirmed={confirmed} aria-pressed={confirmed} onClick={onConfirm}>{confirmed ? `${people} personas confirmadas` : `Confirmar ${people} personas`}</button>
      </div>
    </section>
  );
}
