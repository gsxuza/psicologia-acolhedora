import { Header } from "@/components/layout/Header";
import { PatientForm } from "@/components/patients/PatientForm";

export default function NewPatientPage() {
  return (
    <>
      <Header title="Novo paciente" subtitle="Preencha os dados iniciais do acompanhamento" />
      <main className="flex-1 p-6">
        <div className="card-soft max-w-3xl p-6">
          <PatientForm />
        </div>
      </main>
    </>
  );
}
