"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Lock, Eye, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { PatientDocument } from "@/lib/types";
import { deleteDocument } from "@/app/actions/documents";

const CATEGORY_LABEL: Record<string, string> = {
  orientacao: "Orientação",
  material: "Material de apoio",
  contrato: "Contrato",
  outro: "Outro",
};

const CATEGORY_COLOR: Record<string, string> = {
  orientacao: "bg-mist-100 text-mist-700",
  material: "bg-sage-100 text-sage-700",
  contrato: "bg-sand-200 text-ink-700/70",
  outro: "bg-sand-100 text-ink-700/50",
};

export function DocumentCard({ document }: { document: PatientDocument }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm) { setConfirm(true); return; }
    startTransition(async () => {
      await deleteDocument(document.id);
      router.refresh();
      toast.success("Documento excluído");
    });
  }

  const categoryColor =
    CATEGORY_COLOR[document.category] ?? CATEGORY_COLOR.outro;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-sand-200 bg-white transition-all hover:border-sage-200 hover:shadow-sm ${isPending ? "opacity-50" : ""}`}
    >
      <a
        href={document.file_url}
        target="_blank"
        rel="noreferrer"
        className="flex items-start gap-4 p-5"
      >
        {/* Ícone */}
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-ink-700/40 transition-colors group-hover:bg-sage-100 group-hover:text-sage-600">
          <FileText size={20} />
        </span>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-medium text-ink-800">
              {document.title}
            </p>
            <ExternalLink
              size={13}
              className="mt-0.5 shrink-0 text-ink-700/20 transition-colors group-hover:text-sage-500"
            />
          </div>

          {document.description && (
            <p className="mt-0.5 truncate text-xs text-ink-700/50">
              {document.description}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${categoryColor}`}
            >
              {CATEGORY_LABEL[document.category] ?? document.category}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-ink-700/40">
              {document.is_public ? (
                <><Eye size={11} /> Visível ao paciente</>
              ) : (
                <><Lock size={11} /> Privado</>
              )}
            </span>
          </div>
        </div>
      </a>

      {/* Botão deletar */}
      <button
        onClick={handleDelete}
        onBlur={() => setConfirm(false)}
        className={`absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
          confirm
            ? "bg-dusk-100 text-dusk-600 opacity-100"
            : "bg-sand-100 text-ink-700/40 opacity-0 group-hover:opacity-100 hover:bg-dusk-50 hover:text-dusk-500"
        }`}
      >
        <Trash2 size={11} />
        {confirm ? "Confirmar" : "Excluir"}
      </button>
    </div>
  );
}
