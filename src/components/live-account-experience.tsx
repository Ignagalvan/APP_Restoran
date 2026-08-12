"use client";

import { useEffect, useState } from "react";

import { AccountExperience } from "@/components/account-experience";
import type { AccountData } from "@/lib/account-data";

interface LiveAccountExperienceProps {
  mesa: string;
  initialAccount: AccountData;
  splitPath: string;
  paymentPath: string;
}

export function LiveAccountExperience({ mesa, initialAccount, splitPath, paymentPath }: LiveAccountExperienceProps) {
  const account = useLiveAccount(mesa, initialAccount);

  return <AccountExperience account={account} splitPath={splitPath} paymentPath={paymentPath} />;
}

export function useLiveAccount(mesa: string | undefined, initialAccount: AccountData) {
  const [account, setAccount] = useState(initialAccount);

  useEffect(() => {
    if (!mesa) return undefined;

    let ignore = false;
    let controller: AbortController | null = null;

    const refresh = async () => {
      if (document.visibilityState !== "visible") return;

      controller?.abort();
      controller = new AbortController();

      try {
        const response = await fetch(`/api/mesa/${encodeURIComponent(mesa)}/account`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const nextAccount = (await response.json()) as AccountData;
        if (!ignore) setAccount(nextAccount);
      } catch {
        // Keep the latest visible account if the backend is slow or unavailable.
      }
    };

    const intervalId = window.setInterval(refresh, 6000);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refresh);
      controller?.abort();
    };
  }, [mesa]);

  return account;
}
