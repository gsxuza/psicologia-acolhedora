import Link from "next/link";
import { Plus } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { PatientCard } from "@/components/patients/PatientCard";
import type { Patient } from "@/lib/types";

export default async function PatientsPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const rows = await sql`
    SELECT * FROM patients WHERE created_by = ${userId} ORDER BY full_name ASC
  `;
  const list = rows as Patient[];

  return (
    <>
      <Header title="Pacientes" subtitle={`${list.length} no total`} userEmail={userEmail} />

      <main className="flex-1 p-6">
        <div className="mb-4 flex justify-end">
          <Link href="/pacientes/novo" className="btn-primary">
            <Plus size={16} /> Novo paciente
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="card-soft flex flex-col items-center gap-2 p-12 text-center">
            <p className="font-display text-ink-800">Nenhum paciente cadastrado ainda</p>
            <p className="max-w-sm text-sm text-ink-700/60">
              Comece adicionando o primeiro paciente para organizar sessões, valores e
              anotações em um só lugar.
            </p>
            <Link href="/pacientes/novo" className="btn-primary mt-3">
              <Plus size={16} /> Cadastrar paciente
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {list.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
