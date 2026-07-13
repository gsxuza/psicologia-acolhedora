import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { SessionsBoard } from "@/components/sessions/SessionsBoard";
import type { Patient, Session } from "@/lib/types";

export default async function SessionsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: sessions }, { data: patients }] = await Promise.all([
    supabase
      .from("sessions")
      .select("*")
      .order("date", { ascending: false })
      .order("time", { ascending: false })
      .limit(50),
    supabase.from("patients").select("*").order("full_name"),
  ]);

  return (
    <>
      <Header title="Sessões" subtitle="Sua agenda de atendimentos" userEmail={user?.email} />
      <main className="flex-1 p-6">
        <SessionsBoard
          sessions={(sessions ?? []) as Session[]}
          patients={(patients ?? []) as Patient[]}
        />
      </main>
    </>
  );
}
