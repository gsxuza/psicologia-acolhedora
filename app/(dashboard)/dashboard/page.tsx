import { Users, CalendarCheck, CalendarClock, Wallet } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingSessions } from "@/components/dashboard/UpcomingSessions";
import { formatCurrency } from "@/lib/utils";
import type { Session } from "@/lib/types";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const today = new Date().toISOString().slice(0, 10);

  const [activePatientsRows, todaySessionsRows, pendingPaymentsRows] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM patients WHERE status = 'active' AND created_by = ${userId}`,
    sql`SELECT * FROM sessions WHERE date >= ${today} AND created_by = ${userId} ORDER BY date ASC, time ASC LIMIT 6`,
    sql`SELECT payment_value FROM sessions WHERE payment_status = 'pending' AND created_by = ${userId}`,
  ]);

  const activePatients = activePatientsRows[0]?.count ?? 0;
  const sessions = todaySessionsRows as Session[];
  const pendingTotal = (pendingPaymentsRows as { payment_value: number | null }[]).reduce(
    (sum, s) => sum + (s.payment_value ?? 0),
    0
  );
  const confirmedThisWeek = sessions.filter((s) => s.status === "confirmed").length;

  const firstName = userEmail?.split("@")[0]?.split(".")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  return (
    <>
      <Header
        title="Painel"
        subtitle={`${greeting}${firstName ? `, ${firstName}` : ""}. Aqui está o resumo do seu consultório.`}
        userEmail={userEmail}
      />

      <main className="flex-1 space-y-6 p-4 sm:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Pacientes ativos" value={activePatients} icon={<Users size={18} />} tone="sage" />
          <StatCard
            label="Próximas sessões"
            value={sessions.length}
            icon={<CalendarClock size={18} />}
            tone="mist"
          />
          <StatCard
            label="Confirmadas"
            value={confirmedThisWeek}
            icon={<CalendarCheck size={18} />}
            tone="sage"
          />
          <StatCard
            label="Pagamentos pendentes"
            value={formatCurrency(pendingTotal)}
            icon={<Wallet size={18} />}
            tone="dusk"
          />
        </div>

        {/* Sessões */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink-800">
              Próximas sessões
            </h2>
            <a href="/sessoes" className="text-xs font-medium text-sage-600 hover:underline">
              Ver todas →
            </a>
          </div>
          <UpcomingSessions sessions={sessions} />
        </div>
      </main>
    </>
  );
}
