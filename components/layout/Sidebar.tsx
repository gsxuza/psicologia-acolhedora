"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, CalendarDays, FileText, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Painel", icon: LayoutGrid },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/sessoes", label: "Sessões", icon: CalendarDays },
  { href: "/documentos", label: "Documentos", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sand-200 bg-white/70 px-4 py-6 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100">
          <span className="absolute h-9 w-9 rounded-xl bg-sage-200 animate-breathe" />
          <Leaf className="relative h-4.5 w-4.5 text-sage-600" size={18} />
        </span>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-ink-800">Gabriela Silva</p>
          <p className="text-[11px] text-ink-700/50">painel da psicóloga</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sage-100 text-sage-700"
                  : "text-ink-700/70 hover:bg-sand-200"
              )}
            >
              <Icon size={18} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl bg-mist-50 p-3.5 text-xs text-mist-700">
        <p className="font-medium">Seus dados estão protegidos</p>
        <p className="mt-1 text-mist-700/70">
          Acesso isolado por conta e criptografado em trânsito (RLS + JWT).
        </p>
      </div>
    </aside>
  );
}
