import { CheckCircle2, Clock3, Lock, ReceiptText } from "lucide-react";

import { formatCurrency } from "@/lib/account-data";
import type { ProductUnitGroup } from "@/lib/collaborative-session";

interface ProductSplitListProps {
  groups: ProductUnitGroup[];
  onToggleUnit: (unitId: string) => void;
}

const unitLabel = {
  available: "Disponible",
  selected_by_me: "Tu seleccion",
  reserved_by_other: "En proceso",
  paid: "Pagada",
};

export function ProductSplitList({ groups, onToggleUnit }: ProductSplitListProps) {
  return (
    <section id="split-panel-products" className="space-y-3" role="tabpanel" aria-labelledby="split-tab-products">
      <div>
        <h2 id="products-title" className="font-display text-3xl font-semibold">Elegi tus unidades</h2>
        <p className="mt-1 text-sm text-muted-foreground">Cada unidad tiene estado propio para evitar pagos duplicados.</p>
      </div>
      <ul className="space-y-2.5">
        {groups.map((group) => (
          <li key={group.item.id} className="split-product" data-selected={group.selectedCount > 0}>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 font-semibold">
                {group.item.name}
                {group.selectedCount > 0 ? <CheckCircle2 className="split-selection-check size-4 shrink-0" aria-label="Seleccionado" /> : null}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(group.item.unitPrice)} por unidad</p>
              <p className="mt-2 text-[.68rem] font-semibold text-muted-foreground">
                {group.availableCount} disponibles · {group.reservedCount} en proceso · {group.paidCount} pagadas
              </p>
            </div>
            <div className="split-unit-grid" aria-label={`Unidades de ${group.item.name}`}>
              {group.units.map((unit) => {
                const blocked = unit.status === "paid" || unit.status === "reserved_by_other";
                const Icon = unit.status === "paid" ? ReceiptText : unit.status === "reserved_by_other" ? Clock3 : unit.status === "selected_by_me" ? CheckCircle2 : Lock;

                return (
                  <button
                    key={unit.id}
                    type="button"
                    className="split-unit"
                    data-status={unit.status}
                    disabled={blocked}
                    aria-pressed={unit.status === "selected_by_me"}
                    onClick={() => onToggleUnit(unit.id)}
                  >
                    <Icon className="size-3.5" />
                    <span>Unidad {unit.unitIndex}</span>
                    <small>{unitLabel[unit.status]}</small>
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
