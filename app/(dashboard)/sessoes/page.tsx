import { auth, currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { SessionsBoard } from "@/components/sessions/SessionsBoard";
import type { Patient, Session } from "@/lib/types";

export default async function SessionsPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [sessionRows, patientRows] = await Promise.all([
    sql`SELECT * FROM sessions WHERE created_by = ${userId} ORDER BY date DESC, time DESC LIMIT 50`,
    sql`SELECT * FROM patients WHERE created_by = ${userId} ORDER BY full_name ASC`,
  ]);

  return (
    <>
      <Header title="Sessões" subtitle="Sua agenda de atendimentos" userEmail={userEmail} />
      <main className="flex-1 p-4 sm:p-6">
        <SessionsBoard
          sessions={sessionRows as Session[]}
          patients={patientRows as Patient[]}
        />
      </main>
    </>
  );
}
