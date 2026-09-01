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
    <header className="flex items-center justify-between border-b border-sand-200 bg-white/60 px-6 py-5 backdrop-blur">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-800">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-700/50">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Data atual */}
        <p className="hidden text-xs text-ink-700/40 sm:block capitalize">{today}</p>

        {/* Avatar do usuário */}
        {userEmail && (
          <div className="flex items-center gap-2 rounded-full border border-sand-200 bg-white px-3 py-1.5 shadow-sm">
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
