import { redirect } from "next/navigation";
import Link from "next/link";
import { Leaf, Gauge } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/config";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // A conta da psicóloga usa o painel de gestão, não a área do paciente.
  if (user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-sand-100">
      <header className="flex items-center justify-between border-b border-sand-200 bg-white/70 px-6 py-4">
        <Link href="/portal" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-100">
            <Leaf className="text-sage-600" size={16} />
          </span>
          <span className="font-display text-sm font-semibold text-ink-800">
            Minha área
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/portal/termometro"
            className="flex items-center gap-1.5 text-ink-700/60 hover:text-sage-700"
          >
            <Gauge size={15} /> Termômetro
          </Link>
          <PortalSignOutButton />
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
    </div>
  );
}
