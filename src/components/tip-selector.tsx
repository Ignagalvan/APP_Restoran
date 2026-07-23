import { Check } from "lucide-react";

import { formatCurrency } from "@/lib/account-data";
import { createTipSelection, tipOptions, type TipId } from "@/lib/tip-data";

interface TipSelectorProps {
  baseAmount: number;
  disabled?: boolean;
  value: TipId | null;
  onChange: (tip: TipId) => void;
}

export function TipSelector({ baseAmount, disabled = false, value, onChange }: TipSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="font-display text-3xl font-semibold">¿Querés dejar propina?</legend>
      <p className="pb-1 text-sm text-muted-foreground">También podés continuar sin propina.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {tipOptions.map((option) => {
          const selection = createTipSelection({ baseAmount, currency: "ARS" }, option.id);
          const selected = value === option.id;
          return (
            <label key={option.id} className="tip-option" data-selected={selected} data-disabled={disabled}>
              <input className="sr-only" type="radio" name="tip" value={option.id} checked={selected} disabled={disabled} onChange={() => onChange(option.id)} />
              <span className="tip-option-check" aria-hidden="true">{selected ? <Check className="size-3.5" /> : null}</span>
              <strong>{option.label}</strong>
              <small>{option.percentage === 0 ? "$ 0" : `+ ${formatCurrency(selection?.tipAmount ?? 0)}`}</small>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
