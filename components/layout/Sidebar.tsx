"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/landing/LandingHeader";
import { NAV_ITEMS } from "@/components/layout/navItems";
import { useSignOut } from "@/lib/useSignOut";

export function Sidebar() {
  const pathname = usePathname();
  const { handleSignOut, isSigningOut } = useSignOut();

  return (
    <aside className="hidden w-60 shrink-0 flex-col bg-ink-900 md:flex">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
          <BrandMark size={24} />
        </div>
        <span className="font-display text-sm font-semibold text-white">
          Gabriela<span className="font-normal text-white/50">Silva</span>
        </span>
      </div>

      {/* Label */}
      <p className="mb-2 px-5 text-[10px] font-semibold uppercase tracking-widest text-white/25">
        Menu
      </p>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-sage-600 text-white shadow-lg shadow-sage-600/20"
                  : "text-white/50 hover:bg-white/8 hover:text-white/80"
              )}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/8 p-4">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/40 transition-colors hover:bg-white/8 hover:text-white/70 disabled:opacity-50"
        >
          <LogOut size={16} />
          {isSigningOut ? "Saindo..." : "Sair"}
        </button>
      </div>
    </aside>
  );
}
