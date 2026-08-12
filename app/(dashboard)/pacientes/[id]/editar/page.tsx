import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { PatientForm } from "@/components/patients/PatientForm";
import type { Patient } from "@/lib/types";

export default async function EditPatientPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  const rows = await sql`
    SELECT * FROM patients WHERE id = ${params.id} AND created_by = ${userId} LIMIT 1
  `;

  if (!rows[0]) notFound();

  const patient = rows[0] as Patient;

  return (
    <>
      <Header title={`Editar ${patient.full_name}`} subtitle="Atualize os dados do paciente" />
      <main className="flex-1 p-6">
        <div className="card-soft max-w-3xl p-6">
          <PatientForm patient={patient} />
        </div>
      </main>
    </>
  );
}
