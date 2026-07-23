import type { AccountItemData } from "@/lib/account-data";
import { formatCurrency } from "@/lib/account-data";

interface AccountItemProps { item: AccountItemData; onSelect: (itemId: string) => void; }

export function AccountItem({ item, onSelect }: AccountItemProps) {
  const subtotal = item.quantity * item.unitPrice;
  return (
    <li>
      <button type="button" className="account-item w-full text-left" onClick={() => onSelect(item.id)} aria-label={`Ver detalle de ${item.name}`}>
        <span className="account-quantity" aria-label={`Cantidad ${item.quantity}`}>{item.quantity}</span>
        <div className="min-w-0 flex-1"><p className="font-semibold tracking-[-.015em]">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">{formatCurrency(item.unitPrice)} cada uno</p></div>
        <p className="shrink-0 text-sm font-semibold">{formatCurrency(subtotal)}</p>
      </button>
    </li>
  );
}
