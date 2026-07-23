"use client";

import { useCallback, useState } from "react";

import { AccountActions } from "@/components/account-actions";
import { AccountSummary } from "@/components/account-summary";
import { EmptyAccountState } from "@/components/empty-account-state";
import { MenuBottomSheet } from "@/components/menu-bottom-sheet";
import { accountData } from "@/lib/account-data";
import type { AccountData } from "@/lib/account-data";
import { menuCategories, type MenuItem } from "@/lib/menu-data";

const menuItems = menuCategories.flatMap((category) => category.items);

export function AccountExperience({ account = accountData }: { account?: AccountData; splitPath?: string }) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const closeSheet = useCallback(() => setSelectedItem(null), []);
  const selectItem = (itemId: string) => setSelectedItem(menuItems.find((item) => item.id === itemId) ?? null);
  const hasConsumption = account.items.length > 0;

  return (
    <>
      <div className="relative space-y-4 px-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
        {hasConsumption ? <AccountSummary account={account} onSelectItem={selectItem} /> : <EmptyAccountState />}
        <AccountActions />
        <p className="px-5 pb-4 text-center text-xs leading-relaxed text-muted-foreground">Los importes mostrados corresponden al consumo registrado de la mesa.</p>
      </div>
      <MenuBottomSheet item={selectedItem} onClose={closeSheet} />
    </>
  );
}
