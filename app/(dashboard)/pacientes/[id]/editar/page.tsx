import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { PatientForm } from "@/components/patients/PatientForm";
import type { Patient } from "@/lib/types";

export default async function EditPatientPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: patient } = await supabase
    .from("patients")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!patient) notFound();

  return (
    <>
      <Header title={`Editar ${patient.full_name}`} subtitle="Atualize os dados do paciente" />
      <main className="flex-1 p-6">
        <div className="card-soft max-w-3xl p-6">
          <PatientForm patient={patient as Patient} />
        </div>
      </main>
    </>
  );
}
