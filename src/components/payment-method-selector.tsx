import { Check } from "lucide-react";

import { paymentMethods, type PaymentMethodId } from "@/lib/payment-data";

interface PaymentMethodSelectorProps {
  disabled?: boolean;
  value: PaymentMethodId | null;
  onChange: (method: PaymentMethodId) => void;
}

export function PaymentMethodSelector({ disabled = false, value, onChange }: PaymentMethodSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="font-display text-3xl font-semibold">Como queres pagar?</legend>
      <p className="pb-1 text-sm text-muted-foreground">Elegi un metodo antes de abrir Mercado Pago.</p>
      {paymentMethods.map((method) => {
        const selected = value === method.id;
        const unavailable = !method.enabled;
        const Icon = method.icon;
        return (
          <label key={method.id} className="payment-option" data-selected={selected} data-disabled={disabled || unavailable}>
            <input
              className="sr-only"
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selected}
              disabled={disabled || unavailable}
              onChange={() => onChange(method.id)}
            />
            <span className="payment-option-icon">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="flex items-center gap-2 text-sm">{method.name}{method.badge ? <em className="payment-method-badge">{method.badge}</em> : null}</strong>
              <small className="mt-1 block text-xs text-muted-foreground">{method.description}</small>
            </span>
            <span className="payment-option-check" aria-hidden="true">
              {selected ? <Check className="size-4" /> : null}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
