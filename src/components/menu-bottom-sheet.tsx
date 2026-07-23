"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import type { MenuItem } from "@/lib/menu-data";

interface MenuBottomSheetProps { item: MenuItem | null; onClose: () => void; }

export function MenuBottomSheet({ item, onClose }: MenuBottomSheetProps) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="sheet-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="menu-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="sheet-handle" aria-hidden="true" />
        <button type="button" className="sheet-close" onClick={onClose} aria-label="Cerrar detalle"><X className="size-5" /></button>
        <div className="sheet-photo"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 28rem" className="object-cover" /></div>
        <div className="sheet-content">
          <div className="flex items-start justify-between gap-5"><h2 id="sheet-title" className="font-display text-4xl font-semibold leading-none tracking-[-.035em]">{item.name}</h2><span className="pt-1 text-sm font-semibold text-muted-foreground">{item.price}</span></div>
          {item.description ? <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p> : null}
          {item.tags?.length ? <ul className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <li key={tag} className="menu-tag">{tag}</li>)}</ul> : null}
          <div className="mt-6 border-t border-foreground/10 pt-5"><h3 className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Ingredientes</h3><p className="mt-2 text-sm leading-relaxed">{item.ingredients.join(" · ")}</p></div>
          <div className="mt-5 rounded-2xl bg-secondary/75 p-4"><h3 className="text-xs font-bold uppercase tracking-[.14em] text-primary">Maridaje sugerido</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.pairing}</p></div>
          <button type="button" className="sheet-button" onClick={onClose}>Cerrar</button>
        </div>
      </section>
    </div>
  );
}
