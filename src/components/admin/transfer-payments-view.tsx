"use client";

import { Check, ExternalLink, LoaderCircle, RefreshCw, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { formatCurrency } from "@/lib/account-data";

type Transfer = { id: string; table: string; amount: number; status: "pending" | "approved" | "rejected"; proofFileName?: string; proofDataUrl?: string; createdAt: string };

const labels = { pending: "Pendiente", approved: "Aprobado", rejected: "Rechazado" };

export function TransferPaymentsView() {
  const [payments, setPayments] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/payments/transfers", { cache: "no-store" });
    if (response.ok) setPayments(((await response.json()) as { payments: Transfer[] }).payments);
    setLoading(false);
  }, []);
  useEffect(() => {
    let active = true;
    fetch("/api/payments/transfers", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("LOAD_FAILED")))
      .then((data: { payments: Transfer[] }) => { if (active) setPayments(data.payments); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const review = async (id: string, status: "approved" | "rejected") => {
    setUpdating(id);
    const response = await fetch(`/api/payments/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (response.ok) await load();
    setUpdating(null);
  };

  return <section className="admin-panel-section">
    <div className="admin-section-head"><div><p className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-[#c9b596]">Transferencias</p><h3 className="mt-0.5 text-base font-semibold">Comprobantes recibidos</h3></div><button className="admin-text-link" onClick={() => void load()}><RefreshCw className="size-4" /> Actualizar</button></div>
    {loading ? <p className="admin-transfer-empty"><LoaderCircle className="animate-spin" /> Cargando pagos...</p> : payments.length === 0 ? <p className="admin-transfer-empty">Todavia no hay comprobantes.</p> : <div className="admin-transfer-list">{payments.map((payment) => <article className="admin-transfer-card" key={payment.id}>
      <div><span className={`admin-transfer-status admin-transfer-${payment.status}`}>{labels[payment.status]}</span><h4>{payment.table}</h4><strong>{formatCurrency(payment.amount)}</strong><small>{new Date(payment.createdAt).toLocaleString("es-AR")}</small></div>
      <div className="admin-transfer-actions">{payment.proofDataUrl ? <a href={payment.proofDataUrl} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /> Ver comprobante</a> : null}{payment.status === "pending" ? <><button className="admin-reject" disabled={updating === payment.id} onClick={() => void review(payment.id, "rejected")}><X className="size-4" /> Rechazar</button><button className="admin-approve" disabled={updating === payment.id} onClick={() => void review(payment.id, "approved")}><Check className="size-4" /> Aprobar pago</button></> : null}</div>
    </article>)}</div>}
  </section>;
}
