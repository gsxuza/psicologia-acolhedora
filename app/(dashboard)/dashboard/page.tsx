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

  return (
    <>
      <Header
        title="Painel"
        subtitle="Um resumo tranquilo do seu consultório hoje"
        userEmail={userEmail}
      />

      <main className="flex-1 space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Pacientes ativos" value={activePatients} icon={<Users size={20} />} tone="sage" />
          <StatCard
            label="Próximas sessões"
            value={sessions.length}
            icon={<CalendarClock size={20} />}
            tone="mist"
          />
          <StatCard
            label="Confirmadas"
            value={confirmedThisWeek}
            icon={<CalendarCheck size={20} />}
            tone="sage"
          />
          <StatCard
            label="Pagamentos pendentes"
            value={formatCurrency(pendingTotal)}
            icon={<Wallet size={20} />}
            tone="dusk"
          />
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-semibold text-ink-800">
            Próximas sessões
          </h2>
          <UpcomingSessions sessions={sessions} />
        </div>
      </main>
    </>
  );
}
