import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { SplitExperience } from "@/components/split-experience";
import { accountData } from "@/lib/account-data";
import { getAccountForTable } from "@/lib/table-context";

interface SplitPageProps {
  tableLabel?: string;
  accountPath?: string;
  paymentPath?: string;
}

export function SplitPage({ tableLabel = accountData.table, accountPath = "/account", paymentPath = "/payment" }: SplitPageProps) {
  const account = getAccountForTable(tableLabel);

  return (
    <main className="split-page relative mx-auto min-h-svh w-full max-w-md overflow-hidden bg-background text-foreground sm:my-8 sm:min-h-[calc(100svh-4rem)] sm:rounded-[2.25rem] sm:border sm:border-white/50 sm:shadow-[0_35px_100px_-45px_var(--shadow-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-28 size-60 rounded-full bg-glow-primary blur-3xl" />
        <div className="absolute -left-32 top-14 size-60 rounded-full bg-glow-gold blur-3xl" />
        <div className="grain absolute inset-0 opacity-[.03]" />
      </div>
      <header className="relative px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <Link href={accountPath} className="back-link" aria-label="Volver a la Cuenta Digital"><ArrowLeft className="size-5" /></Link>
          <div className="table-badge"><span className="size-1.5 rounded-full bg-status shadow-[0_0_0_4px_var(--status-soft)]" />{account.table}</div>
        </div>
        <div className="mt-5">
          <p className="mb-1 text-[.68rem] font-bold uppercase tracking-[.16em] text-primary">{accountData.restaurant}</p>
          <h1 className="font-display text-[2.35rem] font-semibold leading-[.95] tracking-[-.035em]">Dividi tu cuenta</h1>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Elegi unidades o una parte igual.</p>
        </div>
      </header>
      <SplitExperience account={account} paymentPath={paymentPath} accountPath={accountPath} />
    </main>
  );
}
