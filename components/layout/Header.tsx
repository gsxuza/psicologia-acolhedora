"use client";

import { initials } from "@/lib/utils";

export function Header({
  title,
  subtitle,
  userEmail,
}: {
  title: string;
  subtitle?: string;
  userEmail?: string | null;
}) {
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="flex items-center justify-between border-b border-sand-200 bg-white/60 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
      <div className="min-w-0">
        <h1 className="truncate font-display text-lg font-semibold text-ink-800 sm:text-xl">{title}</h1>
        {subtitle && <p className="mt-0.5 hidden text-sm text-ink-700/50 sm:block">{subtitle}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {/* Data atual */}
        <p className="hidden text-xs text-ink-700/40 md:block capitalize">{today}</p>

        {/* Avatar do usuário */}
        {userEmail && (
          <div className="flex items-center gap-2 rounded-full border border-sand-200 bg-white px-2.5 py-1.5 shadow-sm sm:px-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-600 text-[11px] font-semibold text-white">
              {initials(userEmail)}
            </span>
            <span className="hidden text-xs font-medium text-ink-700/70 sm:block">
              {userEmail.split("@")[0]}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
