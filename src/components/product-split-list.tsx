import { CheckCircle2, Minus, Plus } from "lucide-react";

import type { AccountItemData } from "@/lib/account-data";
import { formatCurrency } from "@/lib/account-data";

interface ProductSplitListProps {
  items: AccountItemData[];
  quantities: Record<string, number>;
  onChange: (itemId: string, quantity: number) => void;
}

export function ProductSplitList({ items, quantities, onChange }: ProductSplitListProps) {
  return (
    <section id="split-panel-products" className="space-y-3" role="tabpanel" aria-labelledby="split-tab-products">
      <div><h2 id="products-title" className="font-display text-3xl font-semibold">Elegí tus unidades</h2><p className="mt-1 text-sm text-muted-foreground">Podés seleccionar una o más unidades de cada producto.</p></div>
      <ul className="space-y-2.5">
        {items.map((item) => {
          const selected = quantities[item.id] ?? 0;
          return (
            <li key={item.id} className="split-product" data-selected={selected > 0}>
              <div className="min-w-0 flex-1"><p className="flex items-center gap-1.5 font-semibold">{item.name}{selected > 0 ? <CheckCircle2 className="split-selection-check size-4 shrink-0" aria-label="Seleccionado" /> : null}</p><p className="mt-1 text-xs text-muted-foreground">{formatCurrency(item.unitPrice)} por unidad · {item.quantity} disponibles</p></div>
              <div className="split-stepper" aria-label={`Cantidad de ${item.name}`}>
                <button type="button" onClick={() => onChange(item.id, selected - 1)} disabled={selected === 0} aria-label={`Quitar una unidad de ${item.name}`}><Minus className="size-4" /></button>
                <output aria-live="polite" aria-label={`${selected} seleccionadas`}>{selected}</output>
                <button type="button" onClick={() => onChange(item.id, selected + 1)} disabled={selected === item.quantity} aria-label={`Agregar una unidad de ${item.name}`}><Plus className="size-4" /></button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
