import { ReceiptText } from "lucide-react";

import { AccountItem } from "@/components/account-item";
import type { AccountData } from "@/lib/account-data";
import { formatCurrency } from "@/lib/account-data";

interface AccountSummaryProps { account: AccountData; onSelectItem: (itemId: string) => void; }

export function AccountSummary({ account, onSelectItem }: AccountSummaryProps) {
  const subtotal = account.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  return (
    <section className="account-card" aria-labelledby="account-detail-title">
      <div className="flex items-center gap-3 border-b border-foreground/10 pb-4"><span className="grid size-10 place-items-center rounded-2xl bg-secondary text-primary"><ReceiptText className="size-5" /></span><div><h2 id="account-detail-title" className="font-semibold">Detalle del consumo</h2><p className="text-xs text-muted-foreground">{account.items.length} productos diferentes</p></div></div>
      <ul className="divide-y divide-foreground/8">{account.items.map((item) => <AccountItem key={item.id} item={item} onSelect={onSelectItem} />)}</ul>
      <dl className="account-totals"><div><dt>Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div><div className="account-total"><dt>Total</dt><dd>{formatCurrency(subtotal)}</dd></div></dl>
    </section>
  );
}
