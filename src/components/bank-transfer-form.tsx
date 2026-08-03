"use client";

import { CheckCircle2, Clipboard, FileUp, LoaderCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { bankTransferData } from "@/lib/bank-transfer-data";
import { formatCurrency } from "@/lib/account-data";

type TransferState = "form" | "sending" | "pending" | "approved" | "rejected" | "error";

export function BankTransferForm({ accountId, amount }: { accountId: string; amount: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<TransferState>("form");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentId || state !== "pending") return;
    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/payments/${paymentId}`, { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { payment: { status: string } };
      if (data.payment.status === "approved") setState("approved");
      if (data.payment.status === "rejected") setState("rejected");
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paymentId, state]);

  const copy = async (value: string) => navigator.clipboard.writeText(value);
  const submit = async () => {
    if (!file) return;
    setState("sending");
    setMessage(null);
    try {
      const proofDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
        reader.readAsDataURL(file);
      });
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, amount, method: "bank_transfer", provider: "bank_transfer", proofFileName: file.name, proofMimeType: file.type, proofDataUrl }),
      });
      const data = (await response.json()) as { payment?: { id: string }; error?: string };
      if (!response.ok || !data.payment) throw new Error(data.error === "PROOF_TOO_LARGE" ? "El archivo supera los 5 MB." : "No pudimos enviar el comprobante.");
      setPaymentId(data.payment.id);
      setState("pending");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No pudimos enviar el comprobante.");
      setState("error");
    }
  };

  if (state === "approved") return <div className="transfer-result transfer-approved"><CheckCircle2 /><h3>Pago recibido</h3><p>La transferencia fue comprobada. Tu pago esta listo.</p></div>;
  if (state === "rejected") return <div className="transfer-result transfer-rejected"><XCircle /><h3>No pudimos validar el pago</h3><p>Consulta con el personal o carga un comprobante nuevo.</p><button onClick={() => { setState("form"); setFile(null); }}>Volver a intentar</button></div>;
  if (state === "pending") return <div className="transfer-result"><LoaderCircle className="animate-spin" /><h3>Estamos comprobando tu pago</h3><p>Deja esta pantalla abierta. Se actualiza automaticamente cuando el restaurante lo confirme.</p></div>;

  return <section className="transfer-card">
    <div className="transfer-heading"><div><p>Transferi exactamente</p><strong>{formatCurrency(amount)}</strong></div><span>CBU</span></div>
    {[['Alias', bankTransferData.alias], ['CBU', bankTransferData.cbu], ['Titular', bankTransferData.holder]].map(([label, value]) => <div className="transfer-detail" key={label}><span><small>{label}</small><strong>{value}</strong></span><button type="button" onClick={() => copy(value)} aria-label={`Copiar ${label}`}><Clipboard className="size-4" /></button></div>)}
    <label className="proof-upload" data-filled={Boolean(file)}><FileUp className="size-5" /><span><strong>{file ? file.name : "Subi el comprobante"}</strong><small>JPG, PNG, WEBP o PDF · maximo 5 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => { const selected = event.target.files?.[0] ?? null; if (selected && selected.size > 5_000_000) { setMessage("El archivo supera los 5 MB."); setFile(null); } else { setMessage(null); setFile(selected); setState("form"); } }} /></label>
    {message ? <p className="transfer-error" role="alert">{message}</p> : null}
    <button className="transfer-submit" disabled={!file || state === "sending"} onClick={submit}>{state === "sending" ? <><LoaderCircle className="size-4 animate-spin" /> Enviando...</> : "Ya transferi · Enviar comprobante"}</button>
  </section>;
}
