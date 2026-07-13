import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { PatientCard } from "@/components/patients/PatientCard";
import type { Patient } from "@/lib/types";

export default async function PatientsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patients } = await supabase
    .from("patients")
    .select("*")
    .order("full_name", { ascending: true });

  const list = (patients ?? []) as Patient[];

  return (
    <>
      <Header title="Pacientes" subtitle={`${list.length} no total`} userEmail={user?.email} />

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
