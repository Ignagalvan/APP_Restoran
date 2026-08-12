"use client";

import { SplitExperience } from "@/components/split-experience";
import { useLiveAccount } from "@/components/live-account-experience";
import type { AccountData } from "@/lib/account-data";

interface LiveSplitExperienceProps {
  mesa?: string;
  initialAccount: AccountData;
  paymentPath: string;
  accountPath: string;
}

export function LiveSplitExperience({ mesa, initialAccount, paymentPath, accountPath }: LiveSplitExperienceProps) {
  const account = useLiveAccount(mesa, initialAccount);

  return <SplitExperience account={account} paymentPath={paymentPath} accountPath={accountPath} />;
}
