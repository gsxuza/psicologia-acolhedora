import { redirect } from "next/navigation";
import Link from "next/link";
import { Leaf, Gauge, CalendarDays, FileText } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/config";
import { PortalSignOutButton } from "@/components/portal/PortalSignOutButton";
import { PortalMobileNav } from "@/components/portal/PortalMobileNav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
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

        <nav className="hidden items-center gap-5 text-sm sm:flex">
          <Link
            href="/portal/termometro"
            className="flex items-center gap-1.5 text-ink-700/60 hover:text-sage-700"
          >
            <Gauge size={15} /> Termômetro
          </Link>
          <Link
            href="/portal/sessoes"
            className="flex items-center gap-1.5 text-ink-700/60 hover:text-sage-700"
          >
            <CalendarDays size={15} /> Sessões
          </Link>
          <Link
            href="/portal/materiais"
            className="flex items-center gap-1.5 text-ink-700/60 hover:text-sage-700"
          >
            <FileText size={15} /> Materiais
          </Link>
          <PortalSignOutButton />
        </nav>

        {/* Mobile: only sign-out visible in header, bottom nav handles routes */}
        <div className="flex items-center sm:hidden">
          <PortalSignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 pb-24 sm:pb-8">{children}</main>

      <PortalMobileNav />
    </div>
  );
}
