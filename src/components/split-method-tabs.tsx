import { ReceiptText, Users } from "lucide-react";
import type { KeyboardEvent } from "react";

import type { SplitMode } from "@/lib/split-data";

interface SplitMethodTabsProps {
  value: SplitMode;
  onChange: (mode: SplitMode) => void;
}

const methods = [
  { id: "products", label: "Por productos", icon: ReceiptText },
  { id: "equal", label: "Partes iguales", icon: Users },
] as const;

export function SplitMethodTabs({ value, onChange }: SplitMethodTabsProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = methods.findIndex((method) => method.id === value);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % methods.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + methods.length) % methods.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = methods.length - 1;
    else return;
    event.preventDefault();
    const nextMode = methods[nextIndex].id;
    onChange(nextMode);
    requestAnimationFrame(() => document.getElementById(`split-tab-${nextMode}`)?.focus());
  };

  return (
    <div className="split-tabs" role="tablist" aria-label="Modalidad de división" onKeyDown={handleKeyDown}>
      <span className="split-tabs-indicator" data-position={value} aria-hidden="true" />
      {methods.map(({ id, label, icon: Icon }) => (
        <button key={id} id={`split-tab-${id}`} type="button" role="tab" aria-controls={`split-panel-${id}`} aria-selected={value === id} tabIndex={value === id ? 0 : -1} className="split-tab" onClick={() => onChange(id)}>
          <Icon className="size-4" strokeWidth={1.8} />{label}
        </button>
      ))}
    </div>
  );
}
