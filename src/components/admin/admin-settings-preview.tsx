import { Settings } from "lucide-react";

import { EmptyState } from "@/components/admin/empty-state";

export function AdminSettingsPreview() {
  return (
    <section className="admin-panel-section" aria-labelledby="admin-settings-title">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#c9b596]">Próximo módulo</p>
        <h3 id="admin-settings-title" className="mt-1 text-xl font-semibold">Configuración básica</h3>
      </div>
      <EmptyState icon={Settings} title="Preparado para RF-010" description="RF-009 solo muestra el acceso. La edición de módulos, menú y mesas pertenece al próximo requerimiento." />
    </section>
  );
}
