import { auth, currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { DocumentUploadForm } from "@/components/documents/DocumentUploadForm";
import { DocumentCard } from "@/components/documents/DocumentCard";
import type { Patient, PatientDocument } from "@/lib/types";

export default async function DocumentsPage() {
  const { userId } = await auth();
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const [documentRows, patientRows] = await Promise.all([
    sql`SELECT * FROM documents WHERE created_by = ${userId} ORDER BY created_at DESC`,
    sql`SELECT * FROM patients WHERE created_by = ${userId} ORDER BY full_name ASC`,
  ]);

  const list = documentRows as PatientDocument[];

  return (
    <>
      <Header title="Documentos" subtitle="Materiais, orientações e contratos" userEmail={userEmail} />
      <main className="flex-1 space-y-4 p-6">
        <DocumentUploadForm patients={patientRows as Patient[]} />

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
