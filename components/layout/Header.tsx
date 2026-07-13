"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
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
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between border-b border-sand-200 bg-sand-100/80 px-6 py-5 backdrop-blur">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-800">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-700/60">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {userEmail && (
          <div className="hidden items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-softer sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist-100 text-xs font-semibold text-mist-700">
              {initials(userEmail)}
            </span>
            <span className="text-sm text-ink-700/70">{userEmail}</span>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-700/60 transition-colors hover:bg-sand-200"
          title="Sair"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
