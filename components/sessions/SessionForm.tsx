"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { Patient } from "@/lib/types";

const sessionSchema = z.object({
  patient_id: z.string().min(1, "Selecione um paciente"),
  date: z.string().min(1, "Selecione a data"),
  time: z.string().min(1, "Selecione o horário"),
  duration: z.coerce.number().min(10).default(50),
  modality: z.enum(["online", "presencial"]),
  payment_value: z.coerce.number().optional(),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

export function SessionForm({
  patients,
  onCreated,
}: {
  patients: Patient[];
  onCreated?: () => void;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: { duration: 50, modality: "online" },
  });

  async function onSubmit(values: SessionFormValues) {
    setServerError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const patient = patients.find((p) => p.id === values.patient_id);
    if (!patient) return;

    const { error } = await supabase.from("sessions").insert({
      ...values,
      patient_name: patient.full_name,
      payment_value: values.payment_value ?? patient.session_value ?? null,
      created_by: user.id,
    });

    if (error) {
      setServerError("Não foi possível agendar. Tente novamente.");
      return;
    }

    reset();
    router.refresh();
    onCreated?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Select
        label="Paciente"
        className="sm:col-span-2"
        error={errors.patient_id?.message}
        options={[
          { value: "", label: "Selecione um paciente" },
          ...patients.map((p) => ({ value: p.id, label: p.full_name })),
        ]}
        {...register("patient_id")}
      />
      <Input label="Data" type="date" error={errors.date?.message} {...register("date")} />
      <Input label="Horário" type="time" error={errors.time?.message} {...register("time")} />
      <Input label="Duração (min)" type="number" {...register("duration")} />
      <Select
        label="Modalidade"
        options={[
          { value: "online", label: "Online" },
          { value: "presencial", label: "Presencial" },
        ]}
        {...register("modality")}
      />
      <Input
        label="Valor da sessão (R$)"
        type="number"
        step="0.01"
        hint="Deixe em branco para usar o valor padrão do paciente"
        className="sm:col-span-2"
        {...register("payment_value")}
      />

      {serverError && (
        <p className="sm:col-span-2 rounded-lg bg-dusk-50 px-3 py-2 text-sm text-dusk-600">
          {serverError}
        </p>
      )}

      <div className="flex justify-end sm:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Agendando..." : "Agendar sessão"}
        </Button>
      </div>
    </form>
  );
}
