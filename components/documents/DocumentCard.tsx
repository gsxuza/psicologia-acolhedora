import { FileText, Lock, Eye } from "lucide-react";
import type { PatientDocument } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

const CATEGORY_LABEL: Record<string, string> = {
  orientacao: "Orientação",
  material: "Material de apoio",
  contrato: "Contrato",
  outro: "Outro",
};

export function DocumentCard({ document }: { document: PatientDocument }) {
  return (
    <a
      href={document.file_url}
      target="_blank"
      rel="noreferrer"
      className="card-soft flex items-center justify-between gap-3 p-4 transition-shadow hover:shadow-soft"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist-50 text-mist-700">
          <FileText size={18} />
        </span>
        <div>
          <p className="text-sm font-medium text-ink-800">{document.title}</p>
          {document.description && (
            <p className="text-xs text-ink-700/55">{document.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5">
        <Badge tone="mist">{CATEGORY_LABEL[document.category]}</Badge>
        <span className="flex items-center gap-1 text-[11px] text-ink-700/45">
          {document.is_public ? (
            <>
              <Eye size={11} /> Visível ao paciente
            </>
          ) : (
            <>
              <Lock size={11} /> Privado
            </>
          )}
        </span>
      </div>
    </a>
  );
}
