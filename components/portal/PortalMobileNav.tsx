"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gauge, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/portal", label: "Início", icon: Home },
  { href: "/portal/termometro", label: "Termômetro", icon: Gauge },
  { href: "/portal/sessoes", label: "Sessões", icon: CalendarDays },
  { href: "/portal/materiais", label: "Materiais", icon: FileText },
];

export function PortalMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-sand-200 bg-white/90 backdrop-blur sm:hidden">
      <div className="grid grid-cols-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors",
                active ? "text-sage-700" : "text-ink-700/50"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
