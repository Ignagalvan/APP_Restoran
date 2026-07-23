import { TableStatusList } from "@/components/admin/table-status-list";
import { listAdminTables } from "@/lib/admin/admin-data";

export function AdminTablesView() {
  const tables = listAdminTables();
  return (
    <section className="admin-panel-section" aria-labelledby="admin-tables-title">
      <div className="admin-section-head">
        <div>
          <p className="text-[.65rem] font-semibold uppercase tracking-[.14em] text-[#c9b596]">Consulta</p>
          <h3 id="admin-tables-title" className="mt-0.5 text-base font-semibold">Mesas simuladas</h3>
        </div>
        <p className="text-right text-xs text-[#8f877d]">Solo lectura</p>
      </div>
      <TableStatusList tables={tables} />
    </section>
  );
}
