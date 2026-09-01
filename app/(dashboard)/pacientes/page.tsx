import Link from "next/link";
import { Plus, Users } from "lucide-react";
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

  const active = list.filter((p) => p.status === "active").length;
  const waiting = list.filter((p) => p.status === "waiting").length;
  const inactive = list.filter((p) => p.status === "inactive").length;

  return (
    <>
      <Header title="Pacientes" subtitle={`${list.length} cadastrado${list.length !== 1 ? "s" : ""}`} userEmail={userEmail} />

      <main className="flex-1 p-6">
        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-sand-300 bg-white py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100">
              <Users size={24} className="text-sage-600" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink-800">Nenhum paciente cadastrado</p>
              <p className="mt-1 max-w-sm text-sm text-ink-700/55">
                Comece adicionando seu primeiro paciente para organizar sessões, valores e anotações.
              </p>
            </div>
            <Link
              href="/pacientes/novo"
              className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus size={15} /> Cadastrar paciente
            </Link>
          </div>
        ) : (
          <>
            {/* Stats bar */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 font-medium text-sage-700">
                  <span className="h-2 w-2 rounded-full bg-sage-500" /> {active} em acompanhamento
                </span>
                {waiting > 0 && (
                  <span className="flex items-center gap-1.5 text-mist-600">
                    <span className="h-2 w-2 rounded-full bg-mist-400" /> {waiting} em espera
                  </span>
                )}
                {inactive > 0 && (
                  <span className="flex items-center gap-1.5 text-ink-700/40">
                    <span className="h-2 w-2 rounded-full bg-sand-300" /> {inactive} inativo{inactive !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <Link
                href="/pacientes/novo"
                className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Plus size={14} /> Novo paciente
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {list.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
