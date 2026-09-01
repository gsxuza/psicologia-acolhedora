"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createDocument } from "@/app/actions/documents";
import type { Patient } from "@/lib/types";

const documentSchema = z.object({
  title: z.string().min(2, "Informe um título"),
  category: z.enum(["orientacao", "material", "contrato", "outro"]),
  patient_id: z.string().optional(),
  is_public: z.boolean().optional(),
  file_url: z.string().url("Informe uma URL válida"),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

export function DocumentUploadForm({ patients }: { patients: Patient[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: { category: "material" },
  });

  async function onSubmit(values: DocumentFormValues) {
    setError(null);
    startTransition(async () => {
      try {
        await createDocument({
          title: values.title,
          category: values.category,
          patient_id: values.patient_id || undefined,
          is_public: values.is_public ?? false,
          file_url: values.file_url,
        });
        reset();
        setOpen(false);
        router.refresh();
      } catch {
        setError("Não foi possível salvar o documento.");
      }
    });
  }

  const loading = isSubmitting || isPending;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            open
              ? "bg-sand-200 text-ink-700 hover:bg-sand-300"
              : "bg-sage-600 text-white shadow-lg shadow-sage-600/20 hover:bg-sage-700"
          }`}
        >
          {open ? <><X size={15} /> Fechar</> : <><Plus size={15} /> Novo documento</>}
        </button>
      </div>

      {/* Formulário animado */}
      <AnimatePresence>
        {open && (
          <motion.form
            key="doc-form"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-hidden rounded-2xl border border-sage-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-5 font-display text-base font-semibold text-ink-800">
              Novo documento
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Título"
                className="sm:col-span-2"
                error={errors.title?.message}
                {...register("title")}
              />
              <Select
                label="Categoria"
                options={[
                  { value: "orientacao", label: "Orientação" },
                  { value: "material", label: "Material de apoio" },
                  { value: "contrato", label: "Contrato" },
                  { value: "outro", label: "Outro" },
                ]}
                {...register("category")}
              />
              <Select
                label="Paciente (opcional)"
                options={[
                  { value: "", label: "Documento geral" },
                  ...patients.map((p) => ({ value: p.id, label: p.full_name })),
                ]}
                {...register("patient_id")}
              />
              <Input
                label="URL do arquivo"
                type="url"
                className="sm:col-span-2"
                error={errors.file_url?.message}
                placeholder="https://..."
                hint="Cole o link direto para o arquivo (Google Drive, Dropbox, etc.)"
                {...register("file_url")}
              />

              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700/70 sm:col-span-2">
                <input
                  type="checkbox"
                  className="rounded border-sand-300 accent-sage-600"
                  {...register("is_public")}
                />
                Visível para o paciente
              </label>

              {error && (
                <p className="rounded-xl bg-dusk-50 px-3 py-2 text-sm text-dusk-600 sm:col-span-2">
                  {error}
                </p>
              )}

              <div className="flex justify-end sm:col-span-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar documento"}
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
