import { BarChart3, Clock3, MessageCircleHeart, Table2, type LucideIcon } from "lucide-react";

export type AdminTableStatus = "active" | "waiting-payment" | "closed";
export type AdminMetricTone = "neutral" | "success" | "warning";

export interface AdminRestaurant {
  id: string;
  name: string;
  planLabel: string;
  serviceLabel: string;
}

export interface AdminMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: AdminMetricTone;
  icon: LucideIcon;
}

export interface AdminTable {
  id: string;
  label: string;
  status: AdminTableStatus;
  statusLabel: string;
  total: string;
  lastActivity: string;
}

export interface AdminFeedback {
  id: string;
  table: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  receivedAt: string;
}

export interface AdminOverview {
  metrics: AdminMetric[];
  tables: AdminTable[];
  feedback: AdminFeedback[];
}

const restaurant: AdminRestaurant = {
  id: "lumbre",
  name: "Lumbre",
  planLabel: "Panel V1 mock",
  serviceLabel: "Servicio de noche",
};

const tables: AdminTable[] = [
  { id: "mesa-07", label: "Mesa 7", status: "active", statusLabel: "Cuenta abierta", total: "$ 42.600", lastActivity: "Hace 4 min" },
  { id: "mesa-12", label: "Mesa 12", status: "waiting-payment", statusLabel: "Pago en curso", total: "$ 67.500", lastActivity: "Hace 1 min" },
  { id: "mesa-15", label: "Mesa 15", status: "active", statusLabel: "Cuenta abierta", total: "$ 31.800", lastActivity: "Hace 9 min" },
  { id: "mesa-03", label: "Mesa 3", status: "closed", statusLabel: "Cerrada", total: "$ 54.200", lastActivity: "Hace 18 min" },
];

const feedback: AdminFeedback[] = [
  { id: "fdb-01", table: "Mesa 12", rating: 5, comment: "Muy cálido el servicio y la carta se entendió perfecto.", receivedAt: "23:48 hs" },
  { id: "fdb-02", table: "Mesa 7", rating: 4, comment: "La experiencia de pago fue simple.", receivedAt: "23:31 hs" },
  { id: "fdb-03", table: "Mesa 3", rating: 5, comment: "Excelente cierre de la cena.", receivedAt: "22:58 hs" },
];

export function getAdminRestaurant(): AdminRestaurant {
  return restaurant;
}

export function listAdminTables(): AdminTable[] {
  return tables;
}

export function listAdminFeedback(): AdminFeedback[] {
  return feedback;
}

export function getAdminOverview(): AdminOverview {
  const activeTables = tables.filter((table) => table.status !== "closed").length;
  const averageRating = feedback.length ? (feedback.reduce((total, item) => total + item.rating, 0) / feedback.length).toFixed(1) : "—";

  return {
    metrics: [
      { id: "active-tables", label: "Mesas activas", value: String(activeTables), detail: "Cuentas con actividad reciente", tone: "neutral", icon: Table2 },
      { id: "pending-payment", label: "Pagos en curso", value: String(tables.filter((table) => table.status === "waiting-payment").length), detail: "Simulados, sin cobro real", tone: "warning", icon: Clock3 },
      { id: "feedback-count", label: "Opiniones recibidas", value: String(feedback.length), detail: "Feedback mock de la jornada", tone: "success", icon: MessageCircleHeart },
      { id: "average-rating", label: "Calificación promedio", value: averageRating, detail: "Sobre 5 estrellas", tone: "success", icon: BarChart3 },
    ],
    tables: tables.slice(0, 3),
    feedback: feedback.slice(0, 3),
  };
}
