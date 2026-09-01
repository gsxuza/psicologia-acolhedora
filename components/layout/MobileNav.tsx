"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Painel", icon: LayoutGrid },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/sessoes", label: "Sessões", icon: CalendarDays },
  { href: "/documentos", label: "Documentos", icon: FileText },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 flex border-t border-sand-200 bg-white/90 backdrop-blur md:hidden">
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors",
              active ? "text-sage-600" : "text-ink-700/40 hover:text-ink-700/70"
            )}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
