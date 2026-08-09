import { Leaf, WheatOff } from "lucide-react";
import Image from "next/image";

import type { MenuCategoryAccent, MenuItem } from "@/lib/menu-data";

interface MenuItemCardProps { item: MenuItem; onSelect: (item: MenuItem) => void; variant?: MenuCategoryAccent; }

export function MenuItemCard({ item, onSelect, variant = "entradas" }: MenuItemCardProps) {
  return (
    <button type="button" className="menu-item-card w-full text-left" data-variant={variant} data-has-image={Boolean(item.image)} onClick={() => onSelect(item)} aria-label={`Ver detalle de ${item.name}`}>
      {item.image ? (
        <div className="menu-item-visual">
          <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 28rem" className="object-cover" />
          {item.tags?.includes("Recomendado") ? <span className="menu-featured">Recomendado</span> : null}
        </div>
      ) : null}
      <div className="menu-item-content">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.02rem] font-semibold leading-tight tracking-[-0.015em]">{item.name}</h3>
          <p className="shrink-0 text-xs font-semibold text-muted-foreground">{item.price}</p>
        </div>
        {item.description ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p> : null}
        {item.tags?.includes("Vegetariano") || item.tags?.includes("Sin TACC") ? (
          <div className="menu-dietary-icons mt-2">
            {item.tags.includes("Vegetariano") ? <span className="menu-dietary-icon" data-kind="vegetariano" title="Vegetariano" aria-label="Vegetariano"><Leaf className="size-4" strokeWidth={2} /></span> : null}
            {item.tags.includes("Sin TACC") ? <span className="menu-dietary-icon" data-kind="sin-tacc" title="Apto para celíacos (Sin TACC)" aria-label="Apto para celíacos (Sin TACC)"><WheatOff className="size-4" strokeWidth={2} /></span> : null}
          </div>
        ) : null}
        {item.tags?.some((tag) => tag !== "Recomendado" && tag !== "Vegetariano" && tag !== "Sin TACC") ? (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Características del plato">
            {item.tags.filter((tag) => tag !== "Recomendado" && tag !== "Vegetariano" && tag !== "Sin TACC").map((tag) => <li key={tag} className="menu-tag">{tag}</li>)}
          </ul>
        ) : null}
      </div>
    </button>
  );
}
