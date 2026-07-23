import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { AccountExperience } from "@/components/account-experience";
import { accountData } from "@/lib/account-data";
import { getAccountForTable } from "@/lib/table-context";

interface AccountPageProps {
  tableLabel?: string;
  homePath?: string;
  splitPath?: string;
  paymentPath?: string;
}

export function AccountPage({ tableLabel = accountData.table, homePath = "/", splitPath = "/split", paymentPath = "/payment" }: AccountPageProps) {
  const account = getAccountForTable(tableLabel);
  return (
    <main className="account-page relative mx-auto min-h-svh w-full max-w-md overflow-hidden bg-background text-foreground sm:my-8 sm:min-h-[calc(100svh-4rem)] sm:rounded-[2.25rem] sm:border sm:border-white/50 sm:shadow-[0_35px_100px_-45px_var(--shadow-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 overflow-hidden" aria-hidden="true"><div className="absolute -right-24 -top-24 size-72 rounded-full bg-glow-primary blur-3xl" /><div className="absolute -left-32 top-20 size-72 rounded-full bg-glow-gold blur-3xl" /><div className="grain absolute inset-0 opacity-[.03]" /></div>
      <header className="relative px-5 pb-7 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between"><Link href={homePath} className="back-link" aria-label="Volver a la Home"><ArrowLeft className="size-5" /></Link><div className="table-badge"><span className="size-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" />{account.table}</div></div>
        <div className="mt-10"><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-primary">{accountData.restaurant}</p><h1 className="font-display text-[3.4rem] font-semibold leading-[.9] tracking-[-.045em]">Tu consumo</h1><p className="mt-4 whitespace-nowrap text-sm text-muted-foreground">Revisá el consumo antes de continuar al pago.</p><div className="mt-4 flex items-center gap-2 whitespace-nowrap text-xs text-muted-foreground" aria-label="Estado de la cuenta"><span className="size-2 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" aria-hidden="true" /><strong className="font-semibold text-foreground">Cuenta abierta</strong><span aria-hidden="true">·</span><span>Actualizado hace unos instantes</span></div></div>
      </header>
      <AccountExperience account={account} splitPath={splitPath} paymentPath={paymentPath} />
    </main>
  );
}
