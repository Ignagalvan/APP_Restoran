import Link from "next/link";

import { FeedbackPreviewList } from "@/components/admin/feedback-preview-list";
import { MetricCard } from "@/components/admin/metric-card";
import { TableStatusList } from "@/components/admin/table-status-list";
import { getAdminOverview } from "@/lib/admin/admin-data";

export function AdminOverview() {
  const overview = getAdminOverview();
  return (
    <div className="space-y-4">
      <section aria-labelledby="admin-metrics-title">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h3 id="admin-metrics-title" className="text-sm font-semibold">Resumen operativo</h3>
          <span className="text-xs text-[#b7ada0]">Datos mock</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {overview.metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <section className="admin-panel-section" aria-labelledby="admin-tables-preview-title">
          <div className="admin-section-head">
            <div>
              <p className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-[#c9b596]">Mesas</p>
              <h3 id="admin-tables-preview-title" className="mt-0.5 text-base font-semibold">Actividad reciente</h3>
            </div>
            <Link className="admin-text-link" href="/admin/tables">Ver todas</Link>
          </div>
          <TableStatusList tables={overview.tables} />
        </section>

        <section className="admin-panel-section" aria-labelledby="admin-feedback-preview-title">
          <div className="admin-section-head">
            <div>
              <p className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-[#c9b596]">Feedback</p>
              <h3 id="admin-feedback-preview-title" className="mt-0.5 text-base font-semibold">Últimas opiniones</h3>
            </div>
            <Link className="admin-text-link" href="/admin/feedback">Ver feedback</Link>
          </div>
          <FeedbackPreviewList feedback={overview.feedback} />
        </section>
      </div>
    </div>
  );
}
