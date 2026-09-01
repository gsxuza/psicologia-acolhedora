import { auth } from "@clerk/nextjs/server";
import { FileText, ExternalLink, BookOpen, FileCheck, Info, File } from "lucide-react";
import { sql } from "@/lib/db";
import type { Patient, PatientDocument, DocumentCategory } from "@/lib/types";

const categoryLabel: Record<DocumentCategory, string> = {
  orientacao: "Orientações",
  material: "Materiais",
  contrato: "Contratos",
  outro: "Outros",
};

const categoryIcon: Record<DocumentCategory, React.ReactNode> = {
  orientacao: <Info size={14} />,
  material: <BookOpen size={14} />,
  contrato: <FileCheck size={14} />,
  outro: <File size={14} />,
};

export default async function PortalMateriaisPage() {
  const { userId } = await auth();

  const patientRows = await sql`
    SELECT * FROM patients WHERE user_id = ${userId} LIMIT 1
  `;

  if (!patientRows[0]) {
    return (
      <div className="card-soft p-8 text-center">
        <p className="font-display text-lg font-semibold text-ink-800">
          Conta ainda não vinculada
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-700/60">
          Assim que sua psicóloga vincular seu cadastro, seus materiais aparecerão aqui.
        </p>
      </div>
    );
  }

  const p = patientRows[0] as Patient;

  const documentRows = await sql`
    SELECT * FROM documents
    WHERE is_public = true
      AND (patient_id = ${p.id} OR patient_id IS NULL)
    ORDER BY category, created_at DESC
  `;

  const documents = documentRows as PatientDocument[];

  const grouped = documents.reduce<Partial<Record<DocumentCategory, PatientDocument[]>>>(
    (acc, doc) => {
      if (!acc[doc.category]) acc[doc.category] = [];
      acc[doc.category]!.push(doc);
      return acc;
    },
    {}
  );

  const hasDocuments = documents.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-800">
          Materiais para você
        </h1>
        <p className="mt-1 text-sm text-ink-700/60">
          Documentos e recursos compartilhados pela sua psicóloga.
        </p>
      </div>

      {!hasDocuments ? (
        <div className="card-soft p-8 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sand-200">
            <FileText size={20} className="text-ink-700/40" />
          </span>
          <p className="text-sm text-ink-700/60">
            Nenhum material disponível ainda.
          </p>
        </div>
      ) : (
        (Object.keys(categoryLabel) as DocumentCategory[])
          .filter((cat) => grouped[cat]?.length)
          .map((cat) => (
            <section key={cat}>
              <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-ink-700/50">
                {categoryIcon[cat]} {categoryLabel[cat]}
              </h2>
              <div className="card-soft divide-y divide-sand-200">
                {grouped[cat]!.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-sand-50"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink-800">{doc.title}</p>
                      {doc.description && (
                        <p className="mt-0.5 text-xs text-ink-700/50">{doc.description}</p>
                      )}
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-ink-700/30" />
                  </a>
                ))}
              </div>
            </section>
          ))
      )}
    </div>
  );
}
