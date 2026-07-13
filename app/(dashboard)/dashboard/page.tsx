import { Users, CalendarCheck, CalendarClock, Wallet } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingSessions } from "@/components/dashboard/UpcomingSessions";
import { formatCurrency } from "@/lib/utils";
import type { Session } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = new Date().toISOString().slice(0, 10);

  const [{ count: activePatients }, { data: todaySessions }, { data: pendingPayments }] =
    await Promise.all([
      supabase
        .from("patients")
        .select("id", { count: "exact", head: true })
        .eq("status", "active"),
      supabase
        .from("sessions")
        .select("*")
        .gte("date", today)
        .order("date", { ascending: true })
        .order("time", { ascending: true })
        .limit(6),
      supabase.from("sessions").select("payment_value").eq("payment_status", "pending"),
    ]);

  const sessions = (todaySessions ?? []) as Session[];
  const pendingTotal = (pendingPayments ?? []).reduce(
    (sum, s) => sum + (s.payment_value ?? 0),
    0
  );
  const confirmedThisWeek = sessions.filter((s) => s.status === "confirmed").length;

  return (
    <>
      <Header
        title="Painel"
        subtitle="Um resumo tranquilo do seu consultório hoje"
        userEmail={user?.email}
      />

      <main className="flex-1 space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Pacientes ativos" value={activePatients ?? 0} icon={Users} tone="sage" />
          <StatCard
            label="Próximas sessões"
            value={sessions.length}
            icon={CalendarClock}
            tone="mist"
          />
          <StatCard
            label="Confirmadas"
            value={confirmedThisWeek}
            icon={CalendarCheck}
            tone="sage"
          />
          <StatCard
            label="Pagamentos pendentes"
            value={formatCurrency(pendingTotal)}
            icon={Wallet}
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
