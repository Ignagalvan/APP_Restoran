"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { EqualSplitControl } from "@/components/equal-split-control";
import { EmptySplitState } from "@/components/empty-split-state";
import { ProductSplitList } from "@/components/product-split-list";
import { usePaymentFlow } from "@/components/payment-flow-context";
import { SplitMethodTabs } from "@/components/split-method-tabs";
import { SplitSummary } from "@/components/split-summary";
import { Button } from "@/components/ui/button";
import { accountData, type AccountData } from "@/lib/account-data";
import { createPaymentDraft, getAccountTotal, type SplitMode } from "@/lib/split-data";

export function SplitExperience({ account = accountData, paymentPath = "/payment", accountPath = "/account" }: { account?: AccountData; paymentPath?: string; accountPath?: string }) {
  const router = useRouter();
  const { setDraft } = usePaymentFlow();
  const [mode, setMode] = useState<SplitMode>("products");
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [people, setPeople] = useState(2);
  const [confirmedPeople, setConfirmedPeople] = useState<number | null>(null);

  const accountTotal = getAccountTotal(account);
  const hasConsumption = account.items.length > 0 && accountTotal > 0;
  const draft = createPaymentDraft({ account, mode, selectedQuantities, people });
  const ready = Boolean(draft) && (mode === "products" || confirmedPeople === people);
  const amount = draft?.amount ?? 0;
  const unassignedBalance = draft?.unassignedBalance ?? accountTotal;
  const statusText = ready ? "Selección lista" : mode === "products" ? "Elegí al menos una unidad" : "Confirmá la cantidad de personas";

  const changeQuantity = (itemId: string, quantity: number) => {
    const item = account.items.find((candidate) => candidate.id === itemId);
    if (!item) return;
    setSelectedQuantities((current) => ({ ...current, [itemId]: Math.min(item.quantity, Math.max(0, quantity)) }));
  };

  const changeMode = (nextMode: SplitMode) => { setMode(nextMode); };
  const changePeople = (nextPeople: number) => { setPeople(Math.min(10, Math.max(2, nextPeople))); setConfirmedPeople(null); };
  const confirmPeople = () => { setConfirmedPeople(people); };
  const preparePayment = () => { if (ready && draft) { setDraft(draft); router.push(paymentPath); } };

  if (!hasConsumption) return <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))]"><EmptySplitState accountPath={accountPath} /></div>;

  return (
    <div className="split-content relative px-5">
      <SplitMethodTabs value={mode} onChange={changeMode} />
      <div className="split-panel" key={mode}>
        {mode === "products" ? <ProductSplitList items={account.items} quantities={selectedQuantities} onChange={changeQuantity} /> : <EqualSplitControl people={people} amount={amount} confirmed={confirmedPeople === people} onChange={changePeople} onConfirm={confirmPeople} />}
      </div>
      <div className="split-sticky">
        <SplitSummary amount={amount} unassignedBalance={unassignedBalance} ready={ready} statusText={statusText} />
        <Button size="hero" className="mt-3 w-full justify-between disabled:cursor-not-allowed disabled:bg-foreground/12 disabled:text-muted-foreground disabled:opacity-70 disabled:shadow-none disabled:hover:translate-y-0 disabled:active:scale-100" disabled={!ready} onClick={preparePayment}><span>Continuar</span><ArrowRight className="size-5" /></Button>
        <p className="mt-2 min-h-5 text-center text-xs text-muted-foreground" role="status" aria-live="polite">{!ready && mode === "products" ? "Seleccioná al menos un producto para continuar." : !ready ? "Confirmá la cantidad de personas para continuar." : "Nada se guarda ni se cobra en esta etapa."}</p>
      </div>
    </div>
  );
}
