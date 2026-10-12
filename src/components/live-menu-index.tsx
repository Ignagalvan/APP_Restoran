"use client";

import { useEffect, useState } from "react";

import { MenuCategoryIndex } from "@/components/menu-category-index";
import type { MenuCategory } from "@/lib/menu-data";

interface LiveMenuIndexProps {
  basePath: string;
  initialCategories: MenuCategory[];
  preview?: boolean;
  onSelectCategory?: (id: string) => void;
}

export function LiveMenuIndex({ basePath, initialCategories, preview = false, onSelectCategory }: LiveMenuIndexProps) {
  const categories = useLiveMenuCategories(initialCategories, !preview);

  return <MenuCategoryIndex basePath={basePath} categories={categories} onSelectCategory={onSelectCategory} />;
}

export function useLiveMenuCategories(initialCategories: MenuCategory[], live = true) {
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    if (!live) return;
    let ignore = false;
    let controller: AbortController | null = null;

    const refresh = async () => {
      if (document.visibilityState !== "visible") return;

      controller?.abort();
      controller = new AbortController();

      try {
        const response = await fetch("/api/menu", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const nextCategories = (await response.json()) as MenuCategory[];
        if (!ignore) setCategories(nextCategories);
      } catch {
        // Keep the last known menu if the network is slow or Render is waking up.
      }
    };

    const intervalId = window.setInterval(refresh, 10000);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refresh);
      controller?.abort();
    };
  }, [live]);

  return live ? categories : initialCategories;
}
