import { cn } from "@/lib/utils";
import type { AdminMetricTone, AdminTableStatus } from "@/lib/admin/admin-data";

type StatusBadgeProps =
  | { label: string; status: AdminTableStatus; tone?: never }
  | { label: string; tone: AdminMetricTone; status?: never };

export function StatusBadge({ label, status, tone }: StatusBadgeProps) {
  const variant = status ?? tone;
  return <span className={cn("admin-status-badge", `admin-status-${variant}`)}>{label}</span>;
}
