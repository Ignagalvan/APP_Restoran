import { BarChart3, MessageCircleHeart, Settings, Table2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { AdminRestaurant } from "@/lib/admin/admin-data";

type AdminSection = "overview" | "tables" | "feedback" | "settings";

const navItems: Array<{ id: AdminSection; label: string; href: string; icon: typeof BarChart3 }> = [
  { id: "overview", label: "Resumen", href: "/admin", icon: BarChart3 },
  { id: "tables", label: "Mesas", href: "/admin/tables", icon: Table2 },
  { id: "feedback", label: "Feedback", href: "/admin/feedback", icon: MessageCircleHeart },
  { id: "settings", label: "Configuración", href: "/admin/settings", icon: Settings },
];

interface AdminShellProps {
  restaurant: AdminRestaurant;
  active: AdminSection;
  title: string;
  eyebrow: string;
  children: ReactNode;
}

export function AdminShell({ restaurant, active, title, eyebrow, children }: AdminShellProps) {
  return (
    <main className="admin-shell min-h-svh bg-[#11100f] text-[#f8f3ea]">
      <div className="grid min-h-svh w-full gap-0 lg:grid-cols-[13.5rem_1fr]">
        <aside className="admin-sidebar border-b border-white/8 px-3 py-3 lg:sticky lg:top-0 lg:h-svh lg:border-b-0 lg:border-r lg:px-3 lg:py-4">
          <div className="flex items-center gap-3">
            <div className="admin-brand-mark">RO</div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold">{restaurant.name}</h1>
              <p className="mt-0.5 truncate text-xs text-[#8f877d]">{restaurant.serviceLabel}</p>
            </div>
          </div>
          <p className="mt-4 hidden text-[.64rem] font-semibold uppercase tracking-[.16em] text-[#70685f] lg:block">{restaurant.planLabel}</p>
          <nav className="mt-3 flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0" aria-label="Panel restaurante">
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = item.id === active;
              return (
                <Link key={item.id} href={item.href} className={cn("admin-nav-link", selected && "admin-nav-link-active")} aria-current={selected ? "page" : undefined}>
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
          <header className="admin-header">
            <div>
              <p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-[#c9b596]">{eyebrow}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-.025em]">{title}</h2>
            </div>
            <p className="max-w-xl text-xs leading-relaxed text-[#8f877d]">Vista operativa mock: mesas, feedback y señales básicas sin modificar datos reales.</p>
          </header>
          <div className="mt-4">{children}</div>
        </section>
      </div>
    </main>
  );
}
