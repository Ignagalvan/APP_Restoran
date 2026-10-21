"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type {
  SharedAccountCommand,
  SharedAccountState,
} from "@/lib/shared-account";

const stateName = {
  UNPAID: "Por pagar",
  VERIFYING: "En verificación",
  PARTIAL: "Pago parcial",
  PAID: "Pagada",
};
export function SharedAccountExperience({ mesa }: { mesa: string }) {
  const path = `/api/mesa/${encodeURIComponent(mesa)}/shared-account`;
  const [state, setState] = useState<SharedAccountState | null>(null),
    [error, setError] = useState(""),
    [name, setName] = useState("");
  const [busy, setBusy] = useState(false),
    [selected, setSelected] = useState<string[]>([]),
    [dirty, setDirty] = useState(false),
    [uncertain, setUncertain] = useState(false);
  const token = useRef(""),
    sending = useRef(false),
    mounted = useRef(true);
  const attempt = useRef<{ url: string; body: string } | null>(null);
  const money = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value / 100);
  const read = useCallback(async () => {
    const response = await fetch(path, {
      cache: "no-store",
      headers: { "x-account-participant": token.current },
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok)
      throw Object.assign(
        new Error(
          response.status === 404 || response.status === 410
            ? "La cuenta ya no está disponible. Si necesitás ayuda, consultá al mozo."
            : typeof result.message === "string"
              ? result.message
              : "La cuenta no está disponible. Pedile ayuda al mozo.",
        ),
        { status: response.status },
      );
    return result as SharedAccountState;
  }, [path]);
  useEffect(() => {
    mounted.current = true;
    const storageKey = `shared-account-v1:${mesa}`;
    try {
      token.current = localStorage.getItem(storageKey) ?? "";
    } catch {
      /* A credential is still kept in this tab. */
    }
    if (!/^[a-f0-9]{64}$/.test(token.current)) {
      token.current = Array.from(
        crypto.getRandomValues(new Uint8Array(32)),
        (byte) => byte.toString(16).padStart(2, "0"),
      ).join("");
      try {
        localStorage.setItem(storageKey, token.current);
      } catch {
        /* Do not block participation when storage is unavailable. */
      }
    }
    let running = false;
    const refresh = async () => {
      if (document.hidden || sending.current || running) return;
      running = true;
      try {
        const next = await read();
        if (mounted.current) {
          setState(next);
          if (!attempt.current) setError("");
        }
      } catch (e) {
        if (mounted.current) {
          const status = (e as { status?: number }).status;
          if (status === 404 || status === 410) {
            setState(null);
            setDirty(false);
          }
          setError(
            e instanceof Error ? e.message : "No pudimos consultar la cuenta.",
          );
        }
      } finally {
        running = false;
      }
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 3000);
    window.addEventListener("focus", refresh);
    window.addEventListener("online", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      mounted.current = false;
      clearInterval(timer);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("online", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [mesa, read]);
  const own = state?.parts.find((part) => part.id === state.myPartId);
  const serverSelection =
    state?.units
      .filter((unit) => unit.partIds.includes(state.myPartId ?? ""))
      .map((unit) => unit.id) ?? [];
  const chosen = dirty ? selected : serverSelection;
  async function send(
    value: SharedAccountCommand | { label?: string; partId?: string },
    join = false,
  ) {
    if (sending.current || !state) return;
    sending.current = true;
    setBusy(true);
    setError("");
    if (!attempt.current)
      attempt.current = {
        url: `${path}${join ? "?action=join" : ""}`,
        body: JSON.stringify(
          join
            ? value
            : {
                ...value,
                expectedVersion: state.version,
                idempotencyKey: crypto.randomUUID(),
              },
        ),
      };
    try {
      const response = await fetch(attempt.current.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-account-participant": token.current,
        },
        body: attempt.current.body,
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status < 500) {
          attempt.current = null;
          setUncertain(false);
          const fresh = await read();
          if (mounted.current) setState(fresh);
        } else setUncertain(true);
        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "No pudimos confirmar el cambio.",
        );
      }
      attempt.current = null;
      if (mounted.current) {
        setState(result as SharedAccountState);
        setDirty(false);
        setUncertain(false);
      }
    } catch (e) {
      if (mounted.current) {
        if (attempt.current) setUncertain(true);
        setError(
          e instanceof Error ? e.message : "No pudimos confirmar el cambio.",
        );
      }
    } finally {
      sending.current = false;
      if (mounted.current) setBusy(false);
    }
  }
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-6 pb-24 text-slate-900">
      <Link
        className="text-sm underline"
        href={`/mesa/${encodeURIComponent(mesa)}`}
      >
        Volver al menú
      </Link>
      <h1 className="mt-5 text-2xl font-semibold">Cuenta y pagos</h1>
      <p className="mt-2 text-sm text-slate-600">
        Elegí tu consumo. El mozo y Caja ven el mismo reparto.
      </p>
      {error ? (
        <p
          role="alert"
          className="my-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm"
        >
          {error}
        </p>
      ) : null}
      {!state ? (
        !error && (
          <p className="mt-6" role="status">
            Consultando la cuenta… Si todavía no la solicitaron, pedísela al
            mozo.
          </p>
        )
      ) : (
        <>
          <div className="mt-5 rounded-2xl border bg-white p-4">
            <h2 className="font-semibold">{state.tableLabel}</h2>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <p>
                Total
                <strong className="block">{money(state.totalCents)}</strong>
              </p>
              <p>
                Pagado
                <strong className="block text-emerald-700">
                  {money(state.paidCents)}
                </strong>
              </p>
              <p>
                Pendiente
                <strong className="block">{money(state.pendingCents)}</strong>
              </p>
            </div>
          </div>
          {!state.active ? (
            <section className="mt-5 rounded-xl border p-4">
              <h2 className="font-semibold">Consumo de la mesa</h2>
              {state.units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex justify-between gap-3 border-b py-3 text-sm"
                >
                  <span>{unit.name}</span>
                  <strong>{money(unit.amountCents)}</strong>
                </div>
              ))}
              <p className="mt-4 text-sm text-slate-600">
                Caja puede cobrar la cuenta completa. Para dividirla, pedile al
                mozo que prepare el reparto.
              </p>
            </section>
          ) : (
            <>
              {state.unassignedCents > 0 ? (
                <p className="my-4 rounded-xl bg-amber-50 p-3 text-sm">
                  Todavía hay {money(state.unassignedCents)} sin asignar. No se
                  repartirá automáticamente.
                </p>
              ) : null}
              {!own ? (
                <fieldset
                  disabled={busy || uncertain || state.closed}
                  className="mt-5 rounded-2xl border p-4"
                >
                  <legend className="font-semibold">Mi parte</legend>
                  <label className="block text-sm">
                    Tu nombre (opcional)
                    <input
                      className="mt-2 w-full rounded-lg border p-3"
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  {state.mode === "ITEMS" ? (
                    <button
                      className="mt-3 w-full rounded-xl bg-slate-900 p-3 font-semibold text-white"
                      onClick={() => void send({ label: name }, true)}
                    >
                      Elegir lo que consumí
                    </button>
                  ) : null}
                  {state.parts
                    .filter(
                      (part) =>
                        !part.claimed &&
                        !part.locked &&
                        (state.mode !== "ITEMS" || part.amountCents > 0),
                    )
                    .map((part) => (
                      <button
                        key={part.id}
                        className="mt-3 w-full rounded-xl border p-3 text-left"
                        onClick={() =>
                          void send({ label: name, partId: part.id }, true)
                        }
                      >
                        {part.label} · {money(part.amountCents)}
                      </button>
                    ))}
                </fieldset>
              ) : (
                <section className="mt-5 rounded-2xl border bg-white p-4">
                  <h2 className="font-semibold">
                    {own.label} · {stateName[own.state]}
                  </h2>
                  <p className="mt-2">
                    Mi importe: <strong>{money(own.amountCents)}</strong> ·
                    Pendiente: <strong>{money(own.pendingCents)}</strong>
                  </p>
                  {state.mode === "ITEMS" ? (
                    <fieldset
                      disabled={busy || uncertain || own.locked || state.closed}
                      className="mt-4 space-y-2"
                    >
                      <legend className="mb-2 font-medium">
                        Lo que consumí
                      </legend>
                      {state.units.map((unit) => {
                        const others = unit.partIds.filter(
                          (id) => id !== own.id,
                        );
                        return (
                          <label
                            key={unit.id}
                            className="flex items-start gap-3 rounded-xl border p-3"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-5 w-5"
                              checked={chosen.includes(unit.id)}
                              disabled={others.length > 0 && !unit.shared}
                              onChange={() => {
                                setSelected(
                                  chosen.includes(unit.id)
                                    ? chosen.filter((id) => id !== unit.id)
                                    : [...chosen, unit.id],
                                );
                                setDirty(true);
                              }}
                            />
                            <span className="min-w-0 flex-1">
                              {unit.name}
                              <small className="block text-slate-600">
                                {money(unit.amountCents)}
                                {unit.shared
                                  ? " · Compartido"
                                  : others.length
                                    ? " · Elegido por otra persona"
                                    : ""}
                              </small>
                            </span>
                          </label>
                        );
                      })}
                      <button
                        className="w-full rounded-xl bg-slate-900 p-3 font-semibold text-white disabled:opacity-40"
                        disabled={!dirty}
                        onClick={() =>
                          void send({
                            action: "claim",
                            partId: own.id,
                            unitIds: chosen,
                          })
                        }
                      >
                        Confirmar mi consumo
                      </button>
                      <p className="text-xs text-slate-600">
                        Para compartir un plato o corregir una parte pagada,
                        pedile ayuda al mozo.
                      </p>
                    </fieldset>
                  ) : null}
                  <fieldset
                    disabled={busy || uncertain || own.locked || state.closed}
                    className="mt-4"
                  >
                    <label className="text-sm">
                      Cómo pensás pagar
                      <select
                        className="mt-2 w-full rounded-xl border p-3"
                        value={own.preferredMethod ?? ""}
                        onChange={(e) =>
                          void send({
                            action: "preference",
                            partId: own.id,
                            method: e.target.value as
                              "CASH" | "POSNET" | "TRANSFER",
                          })
                        }
                      >
                        <option value="" disabled>
                          Elegí un medio
                        </option>
                        <option value="CASH">Efectivo</option>
                        <option value="POSNET">Tarjeta</option>
                        <option value="TRANSFER">Transferencia</option>
                      </select>
                    </label>
                  </fieldset>
                  <p className="mt-3 text-sm text-slate-600">
                    Elegir consumo o medio de pago no registra dinero recibido.
                    Caja verifica los cobros; no vuelvas a pagar si falta una
                    confirmación.
                  </p>
                </section>
              )}
              <section className="mt-5 rounded-2xl border p-4">
                <h2 className="font-semibold">Cómo va la cuenta</h2>
                {state.parts.map((part) => (
                  <div
                    key={part.id}
                    className="flex justify-between gap-3 border-b py-3 text-sm"
                  >
                    <div>
                      {part.label}
                      <small className="block text-slate-600">
                        {stateName[part.state]}
                      </small>
                    </div>
                    <strong>{money(part.pendingCents)}</strong>
                  </div>
                ))}
              </section>
            </>
          )}
        </>
      )}
      {uncertain ? (
        <button
          className="mt-4 w-full rounded-xl border p-3 font-semibold"
          disabled={busy}
          onClick={() => void send({})}
        >
          Verificar el mismo cambio
        </button>
      ) : null}
    </main>
  );
}
