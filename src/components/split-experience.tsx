"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { EqualSplitControl } from "@/components/equal-split-control";
import { EmptySplitState } from "@/components/empty-split-state";
import { ProductSplitList } from "@/components/product-split-list";
import { usePaymentFlow } from "@/components/payment-flow-context";
import { SplitMethodTabs } from "@/components/split-method-tabs";
import { SplitSummary } from "@/components/split-summary";
import { Button } from "@/components/ui/button";
import { accountData, type AccountData } from "@/lib/account-data";
import {
  buildProductUnitGroups,
  createEqualParts,
  getEqualOverview,
  getProductOverview,
  getSelectedProductUnits,
  getSelectedQuantitiesFromUnits,
} from "@/lib/collaborative-session";
import { createPaymentDraft, getAccountTotal, type SplitMode } from "@/lib/split-data";

export function SplitExperience({ account = accountData, paymentPath = "/payment", accountPath = "/account" }: { account?: AccountData; paymentPath?: string; accountPath?: string }) {
  const router = useRouter();
  const { setDraft } = usePaymentFlow();
  const [mode, setMode] = useState<SplitMode>("products");
  const [selectedUnitIds, setSelectedUnitIds] = useState<string[]>([]);
  const [people, setPeople] = useState(2);
  const [confirmedPeople, setConfirmedPeople] = useState<number | null>(null);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  const accountTotal = getAccountTotal(account);
  const hasConsumption = account.items.length > 0 && accountTotal > 0;
  const productGroups = useMemo(() => buildProductUnitGroups(account, selectedUnitIds), [account, selectedUnitIds]);
  const selectedQuantities = useMemo(() => getSelectedQuantitiesFromUnits(productGroups), [productGroups]);
  const selectedUnits = useMemo(() => getSelectedProductUnits(productGroups), [productGroups]);
  const equalParts = useMemo(() => createEqualParts(accountTotal, people, selectedPartId), [accountTotal, people, selectedPartId]);
  const selectedPart = equalParts.find((part) => part.id === selectedPartId && part.status === "selected_by_me") ?? null;
  const overview = mode === "products" ? getProductOverview(account, productGroups) : getEqualOverview(accountTotal, equalParts);
  const draft = createPaymentDraft({ account, mode, selectedQuantities, people, fixedAmount: selectedPart?.amount });
  const ready = mode === "products" ? selectedUnits.length > 0 && Boolean(draft) : confirmedPeople === people && Boolean(selectedPart) && Boolean(draft);
  const amount = mode === "products" ? overview.selectedAmount : selectedPart?.amount ?? 0;
  const statusText = ready ? "Seleccion lista" : mode === "products" ? "Elegi al menos una unidad disponible" : confirmedPeople === people ? "Toma una parte disponible" : "Confirma la cantidad de personas";

  const toggleUnit = (unitId: string) => {
    const unit = productGroups.flatMap((group) => group.units).find((candidate) => candidate.id === unitId);
    if (!unit || unit.status === "paid" || unit.status === "reserved_by_other") return;

    setSelectedUnitIds((current) => (current.includes(unitId) ? current.filter((id) => id !== unitId) : [...current, unitId]));
  };

  const changeMode = (nextMode: SplitMode) => {
    setMode(nextMode);
  };
  const changePeople = (nextPeople: number) => {
    setPeople(Math.min(10, Math.max(2, nextPeople)));
    setConfirmedPeople(null);
    setSelectedPartId(null);
  };
  const confirmPeople = () => {
    setConfirmedPeople(people);
    setSelectedPartId(null);
  };
  const selectPart = (partId: string) => {
    const part = equalParts.find((candidate) => candidate.id === partId);
    if (!part || part.status === "paid" || part.status === "paying") return;
    setSelectedPartId((current) => (current === partId ? null : partId));
  };
  const preparePayment = () => {
    if (ready && draft) {
      setDraft(draft);
      router.push(paymentPath);
    }
  };

  if (!hasConsumption) return <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))]"><EmptySplitState accountPath={accountPath} /></div>;

  return (
    <div className="split-content relative px-5">
      <SplitMethodTabs value={mode} onChange={changeMode} />
      <div className="split-panel" key={mode}>
        {mode === "products" ? (
          <ProductSplitList groups={productGroups} onToggleUnit={toggleUnit} />
        ) : (
          <EqualSplitControl
            people={people}
            amount={equalParts[0]?.amount ?? 0}
            confirmed={confirmedPeople === people}
            parts={equalParts}
            selectedPartId={selectedPartId}
            onChange={changePeople}
            onConfirm={confirmPeople}
            onSelectPart={selectPart}
          />
        )}
      </div>
      <div className="split-sticky">
        <SplitSummary
          amount={amount}
          paidAmount={overview.paidAmount}
          inProcessAmount={overview.inProcessAmount}
          pendingAmount={overview.pendingAmount}
          progress={overview.progress}
          ready={ready}
          statusText={statusText}
          messages={overview.messages}
        />
        <Button size="hero" className="mt-3 w-full justify-between disabled:cursor-not-allowed disabled:bg-foreground/12 disabled:text-muted-foreground disabled:opacity-70 disabled:shadow-none disabled:hover:translate-y-0 disabled:active:scale-100" disabled={!ready} onClick={preparePayment}><span>Continuar</span><ArrowRight className="size-5" /></Button>
        <p className="mt-2 min-h-5 text-center text-xs text-muted-foreground" role="status" aria-live="polite">{ready ? "Tu seleccion se envia a la misma pantalla de pago." : "No se puede pagar algo que ya esta pagado o en proceso."}</p>
      </div>
    </div>
  );
}
