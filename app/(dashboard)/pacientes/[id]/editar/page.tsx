import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { PatientForm } from "@/components/patients/PatientForm";
import type { Patient } from "@/lib/types";

export default async function EditPatientPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();

  const rows = await sql`
    SELECT * FROM patients WHERE id = ${params.id} AND created_by = ${userId} LIMIT 1
  `;

  if (!rows[0]) notFound();

  const patient = rows[0] as Patient;

  return (
    <>
      <Header
        title={`Editar ${patient.full_name}`}
        subtitle="Atualize os dados do paciente"
      />

      <main className="flex-1 p-4 sm:p-6">
        <Link
          href={`/pacientes/${patient.id}`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-ink-700/50 transition-colors hover:text-ink-700"
        >
          <ArrowLeft size={14} /> Ficha do paciente
        </Link>

        <div className="max-w-3xl overflow-hidden rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
          <PatientForm patient={patient} />
        </div>
      </main>
    </>
  );
}
