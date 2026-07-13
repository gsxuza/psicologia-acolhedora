"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X } from "lucide-react";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Patient } from "@/lib/types";

const documentSchema = z.object({
  title: z.string().min(2, "Informe um título"),
  category: z.enum(["orientacao", "material", "contrato", "outro"]),
  patient_id: z.string().optional(),
  is_public: z.boolean().optional(),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

export function DocumentUploadForm({ patients }: { patients: Patient[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    if (!file) {
      setError("Selecione um arquivo para enviar.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(path, file);

    if (uploadError) {
      setError("Falha ao enviar o arquivo. Tente novamente.");
      return;
    }

    const { data: publicUrl } = supabase.storage.from("documents").getPublicUrl(path);

    const { error: insertError } = await supabase.from("documents").insert({
      title: values.title,
      category: values.category,
      patient_id: values.patient_id || null,
      is_public: values.is_public ?? false,
      file_url: publicUrl.publicUrl,
      created_by: user.id,
    });

    if (insertError) {
      setError("Não foi possível salvar o documento.");
      return;
    }

    reset();
    setFile(null);
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant={open ? "ghost" : "primary"} onClick={() => setOpen((v) => !v)}>
          {open ? (
            <>
              <X size={16} /> Fechar
            </>
          ) : (
            <>
              <Plus size={16} /> Novo documento
            </>
          )}
        </Button>
      </div>

      {open && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-soft grid animate-fadeUp grid-cols-1 gap-4 p-6 sm:grid-cols-2"
        >
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

          <div className="sm:col-span-2">
            <label className="label-field">Arquivo</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-ink-700/70 file:mr-3 file:rounded-lg file:border-0 file:bg-sage-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-sage-700"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-ink-700/70 sm:col-span-2">
            <input type="checkbox" className="rounded border-sand-300" {...register("is_public")} />
            Visível para o paciente
          </label>

          {error && (
            <p className="sm:col-span-2 rounded-lg bg-dusk-50 px-3 py-2 text-sm text-dusk-600">
              {error}
            </p>
          )}

          <div className="flex justify-end sm:col-span-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Salvar documento"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
