"use client";

import { Leaf, WheatOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { MenuItem } from "@/lib/menu-data";
import { currentMenuChoices } from '@/lib/menu-option-choices';

interface MenuBottomSheetProps { item: MenuItem | null; onClose: () => void; }

export function MenuBottomSheet({ item, onClose }: MenuBottomSheetProps) {
  const [choices, setChoices] = useState<Record<string, string[]>>({});
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [item, onClose]);

  if (!item) return null;
  const selectedChoices = currentMenuChoices(item.optionGroups ?? [], choices);
  const extras = (item.optionGroups ?? []).reduce((sum, group) => sum + group.options.filter(option => selectedChoices[group.id]?.includes(option.id)).reduce((subtotal, option) => subtotal + Math.round((option.surcharge ?? 0) * 100), 0), 0);
  const total = item.unitPrice === undefined ? null : (Math.round(item.unitPrice * 100) + extras) / 100;
  const missing = (item.optionGroups ?? []).filter(group => group.required && !selectedChoices[group.id]?.length);

  return (
    <div className="sheet-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="menu-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div className="sheet-handle" aria-hidden="true" />
        {item.image ? <div className="sheet-photo"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 28rem" className="object-cover" unoptimized={item.image.startsWith("http")} /></div> : null}
        <div className="sheet-content">
          <div className="flex items-start justify-between gap-5"><h2 id="sheet-title" className="font-display text-4xl font-semibold leading-none tracking-[-.035em]">{item.name}</h2><div className="shrink-0 pt-1 text-right text-sm"><span className="font-semibold">{item.price}</span>{item.regularPrice ? <del className="block text-xs text-muted-foreground">{item.regularPrice}</del> : null}</div></div>
          {item.promotionName ? <p className="mt-2 text-xs">{item.promotionName} · No acumulable · Extras aparte</p> : null}
          {item.description ? <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p> : null}
          {item.tags?.includes("Vegetariano") || item.tags?.includes("Sin TACC") ? (
            <div className="menu-dietary-icons mt-3">
              {item.tags.includes("Vegetariano") ? <span className="menu-dietary-icon" data-kind="vegetariano" title="Vegetariano" aria-label="Vegetariano"><Leaf className="size-4" strokeWidth={2} /></span> : null}
              {item.tags.includes("Sin TACC") ? <span className="menu-dietary-icon" data-kind="sin-tacc" title="Apto para celíacos (Sin TACC)" aria-label="Apto para celíacos (Sin TACC)"><WheatOff className="size-4" strokeWidth={2} /></span> : null}
            </div>
          ) : null}
          {item.tags?.some((tag) => tag !== "Vegetariano" && tag !== "Sin TACC") ? (
            <ul className="mt-3 flex flex-wrap gap-2">{item.tags.filter((tag) => tag !== "Vegetariano" && tag !== "Sin TACC").map((tag) => <li key={tag} className="menu-tag">{tag}</li>)}</ul>
          ) : null}
          {item.ingredients?.length ? <div className="mt-6 border-t border-foreground/10 pt-5"><h3 className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">Ingredientes</h3><p className="mt-2 text-sm leading-relaxed">{item.ingredients.join(" · ")}</p></div> : null}
          {item.pairing ? <div className="mt-5 rounded-2xl bg-secondary/75 p-4"><h3 className="text-xs font-bold uppercase tracking-[.14em] text-primary">Maridaje sugerido</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.pairing}</p></div> : null}
          {item.optionGroups?.map((group) => (
            <fieldset key={group.id} className="menu-option-group">
              <legend>{group.title}</legend>
              <div className="menu-option-head"><p>{group.description}</p><span>{group.required ? 'Obligatoria' : 'Opcional'}</span></div>
              <div className="menu-option-list">
                {!group.required && !group.multiple ? <label className="menu-option"><span className="flex items-center gap-3"><input type="radio" name={`menu-option-${group.id}`} checked={!selectedChoices[group.id]?.length} disabled={item.available === false} onChange={() => setChoices(current => ({ ...current, [group.id]: [] }))} />Sin selección</span></label> : null}
                {group.options.map((option) => (
                  <label key={option.id} className="menu-option">
                    <span className="flex items-center gap-3"><input type={group.multiple ? 'checkbox' : 'radio'} name={`menu-option-${group.id}`} checked={selectedChoices[group.id]?.includes(option.id) ?? false} disabled={item.available === false || option.available === false || (group.multiple && !selectedChoices[group.id]?.includes(option.id) && selectedChoices[group.id].length >= (group.maxChoices ?? 1))} onChange={event => { const checked = event.target.checked; setChoices(current => ({ ...current, [group.id]: group.multiple ? checked ? [...selectedChoices[group.id], option.id] : selectedChoices[group.id].filter(id => id !== option.id) : [option.id] })); }} />{option.name}{option.available === false ? " · Agotado" : ""}</span>{option.price ? <strong>{option.price}</strong> : null}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          {total !== null && item.optionGroups?.length ? <div className="mt-5 border-t border-foreground/10 pt-4" aria-live="polite"><div className="flex justify-between gap-3 text-sm"><span>Precio con tu selección</span><strong>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2 }).format(total)}</strong></div>{missing.length ? <p className="mt-2 text-xs text-muted-foreground">Falta elegir: {missing.map(group => group.title).join(', ')}.</p> : null}<p className="mt-2 text-xs text-muted-foreground">Confirmá tu elección con el mozo. Esto no envía un pedido.</p></div> : null}
          <button type="button" className="sheet-button" onClick={onClose}>Cerrar</button>
        </div>
      </section>
    </div>
  );
}
