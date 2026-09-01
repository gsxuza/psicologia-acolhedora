import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { PatientForm } from "@/components/patients/PatientForm";

export default function NewPatientPage() {
  return (
    <>
      <Header title="Novo paciente" subtitle="Preencha os dados iniciais do acompanhamento" />

      <main className="flex-1 p-4 sm:p-6">
        <Link
          href="/pacientes"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-ink-700/50 transition-colors hover:text-ink-700"
        >
          <ArrowLeft size={14} /> Pacientes
        </Link>

        <div className="max-w-3xl overflow-hidden rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
          <PatientForm />
        </div>
      </main>
    </>
  );
}
