"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Patient } from "@/lib/types";

const patientSchema = z.object({
  full_name: z.string().min(2, "Informe o nome completo"),
  email: z.string().email("E-mail inválido").or(z.literal("")).optional(),
  phone: z.string().optional(),
  birth_date: z.string().optional(),
  status: z.enum(["active", "inactive", "waiting"]),
  main_complaint: z.string().optional(),
  emergency_contact: z.string().optional(),
  session_value: z.coerce.number().optional(),
  notes: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export function PatientForm({ patient }: { patient?: Patient }) {
  const router = useRouter();
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient
      ? {
          full_name: patient.full_name,
          email: patient.email ?? "",
          phone: patient.phone ?? "",
          birth_date: patient.birth_date ?? "",
          status: patient.status,
          main_complaint: patient.main_complaint ?? "",
          emergency_contact: patient.emergency_contact ?? "",
          session_value: patient.session_value ?? undefined,
          notes: patient.notes ?? "",
        }
      : { status: "waiting" },
  });

  async function onSubmit(values: PatientFormValues) {
    setServerError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const payload = { ...values, created_by: user.id };

    const { error, data } = patient
      ? await supabase.from("patients").update(payload).eq("id", patient.id).select().single()
      : await supabase.from("patients").insert(payload).select().single();

    if (error) {
      setServerError("Não foi possível salvar. Verifique os dados e tente novamente.");
      return;
    }

    router.push(`/pacientes/${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        label="Nome completo"
        className="sm:col-span-2"
        error={errors.full_name?.message}
        {...register("full_name")}
      />
      <Input label="E-mail" type="email" error={errors.email?.message} {...register("email")} />
      <Input label="Telefone / WhatsApp" {...register("phone")} />
      <Input label="Data de nascimento" type="date" {...register("birth_date")} />
      <Select
        label="Status"
        options={[
          { value: "waiting", label: "Em espera" },
          { value: "active", label: "Em acompanhamento" },
          { value: "inactive", label: "Inativo" },
        ]}
        {...register("status")}
      />
      <Input
        label="Valor da sessão (R$)"
        type="number"
        step="0.01"
        {...register("session_value")}
      />
      <Input label="Contato de emergência" {...register("emergency_contact")} />
      <Textarea
        label="Queixa principal"
        className="sm:col-span-2"
        {...register("main_complaint")}
      />
      <Textarea
        label="Observações (confidencial)"
        hint="Visível apenas para você — nunca compartilhado com o paciente."
        className="sm:col-span-2"
        {...register("notes")}
      />

      {serverError && (
        <p className="sm:col-span-2 rounded-lg bg-dusk-50 px-3 py-2 text-sm text-dusk-600">
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-3 sm:col-span-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar paciente"}
        </Button>
      </div>
    </form>
  );
}
