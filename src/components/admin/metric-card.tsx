import { StatusBadge } from "@/components/admin/status-badge";
import type { AdminMetric } from "@/lib/admin/admin-data";

export function MetricCard({ metric }: { metric: AdminMetric }) {
  const Icon = metric.icon;
  return (
    <article className="admin-card">
      <div className="flex items-center justify-between gap-3">
        <div className="admin-card-icon"><Icon className="size-5" /></div>
        <StatusBadge label={metric.tone === "warning" ? "Revisar" : "Listo"} tone={metric.tone} />
      </div>
      <p className="mt-3 text-xs text-[#8f877d]">{metric.label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-[-.04em]">{metric.value}</p>
      <p className="mt-1 truncate text-xs text-[#8f877d]">{metric.detail}</p>
    </article>
  );
}
