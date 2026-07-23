import { Table2 } from "lucide-react";

import { EmptyState } from "@/components/admin/empty-state";
import { StatusBadge } from "@/components/admin/status-badge";
import type { AdminTable } from "@/lib/admin/admin-data";

export function TableStatusList({ tables }: { tables: AdminTable[] }) {
  if (tables.length === 0) return <EmptyState icon={Table2} title="Sin mesas para mostrar" description="Cuando haya actividad mock, las mesas aparecerán en esta sección." />;

  return (
    <div className="admin-data-list" role="table" aria-label="Estado de mesas">
      <div className="admin-data-header" role="row">
        <span role="columnheader">Mesa</span>
        <span role="columnheader">Estado</span>
        <span role="columnheader">Total</span>
        <span role="columnheader">Actividad</span>
      </div>
      {tables.map((table) => (
        <article key={table.id} className="admin-data-row admin-table-row" role="row">
          <h3 className="font-medium" role="cell">{table.label}</h3>
          <div role="cell"><StatusBadge label={table.statusLabel} status={table.status} /></div>
          <p className="font-mono text-sm font-semibold" role="cell">{table.total}</p>
          <p className="text-xs text-[#8f877d]" role="cell">{table.lastActivity}</p>
        </article>
      ))}
    </div>
  );
}
