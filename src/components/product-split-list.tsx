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
        <p className="mt-1 text-sm text-muted-foreground">Toca las unidades disponibles que queres pagar.</p>
      </div>
      <ul className="split-product-list">
        {groups.map((group) => (
          <li key={group.item.id} className="split-product" data-selected={group.selectedCount > 0}>
            <div className="split-product-head">
              <div className="min-w-0">
                <p className="truncate font-semibold">{group.item.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{formatCurrency(group.item.unitPrice)} c/u</p>
              </div>
              <p className="split-product-state">{group.selectedCount > 0 ? `${group.selectedCount} elegida${group.selectedCount > 1 ? "s" : ""}` : `${group.availableCount} disp.`}</p>
            </div>
            <div className="split-unit-grid" aria-label={`Unidades de ${group.item.name}`}>
              {group.units.map((unit) => {
                const blocked = unit.status === "paid" || unit.status === "reserved_by_other";

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
                    <span>U{unit.unitIndex}</span>
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
