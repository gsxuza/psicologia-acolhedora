import { FileText } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import { DocumentUploadForm } from "@/components/documents/DocumentUploadForm";
import { DocumentList } from "@/components/documents/DocumentList";
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
      <Header
        title="Documentos"
        subtitle="Materiais, orientações e contratos"
        userEmail={userEmail}
      />

      <main className="flex-1 space-y-5 p-4 sm:p-6">
        <DocumentUploadForm patients={patientRows as Patient[]} />

        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-sand-300 bg-white py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100">
              <FileText size={24} className="text-ink-700/30" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink-800">
                Nenhum documento ainda
              </p>
              <p className="mt-1 max-w-sm text-sm text-ink-700/50">
                Envie materiais de apoio, orientações ou contratos para
                organizar tudo em um só lugar.
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink-700/50">
              {list.length} documento{list.length !== 1 ? "s" : ""}
            </p>
            <DocumentList documents={list} />
          </>
        )}
      </main>
    </>
  );
}
