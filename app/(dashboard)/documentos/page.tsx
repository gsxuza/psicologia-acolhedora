import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { DocumentUploadForm } from "@/components/documents/DocumentUploadForm";
import { DocumentCard } from "@/components/documents/DocumentCard";
import type { Patient, PatientDocument } from "@/lib/types";

export default async function DocumentsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: documents }, { data: patients }] = await Promise.all([
    supabase.from("documents").select("*").order("created_at", { ascending: false }),
    supabase.from("patients").select("*").order("full_name"),
  ]);

  const list = (documents ?? []) as PatientDocument[];

  return (
    <>
      <Header title="Documentos" subtitle="Materiais, orientações e contratos" userEmail={user?.email} />
      <main className="flex-1 space-y-4 p-6">
        <DocumentUploadForm patients={(patients ?? []) as Patient[]} />

        {list.length === 0 ? (
          <div className="card-soft flex flex-col items-center gap-2 p-12 text-center">
            <p className="font-display text-ink-800">Nenhum documento por aqui</p>
            <p className="max-w-sm text-sm text-ink-700/60">
              Envie materiais de apoio, orientações ou contratos para organizar tudo em um só
              lugar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {list.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
