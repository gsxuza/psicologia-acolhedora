"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Stethoscope, ShieldAlert } from "lucide-react";
import { Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createPatient, updatePatient } from "@/app/actions/patients";
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

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 pb-3 pt-1 sm:col-span-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sand-100 text-ink-700/40">
        {icon}
      </span>
      <p className="text-sm font-semibold text-ink-800">{title}</p>
      <div className="h-px flex-1 bg-sand-200" />
    </div>
  );
}

export function PatientForm({ patient }: { patient?: Patient }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      try {
        if (patient) {
          await updatePatient(patient.id, values);
          router.push(`/pacientes/${patient.id}`);
        } else {
          await createPatient(values);
          router.push("/pacientes");
        }
      } catch {
        setServerError(
          "Não foi possível salvar. Verifique os dados e tente novamente."
        );
      }
    });
  }

  const loading = isSubmitting || isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {/* Dados pessoais */}
      <SectionHeading icon={<User size={14} />} title="Dados pessoais" />

      <Input
        label="Nome completo"
        className="sm:col-span-2"
        error={errors.full_name?.message}
        {...register("full_name")}
      />
      <Input
        label="Data de nascimento"
        type="date"
        {...register("birth_date")}
      />
      <Select
        label="Status"
        options={[
          { value: "waiting", label: "Em espera" },
          { value: "active", label: "Em acompanhamento" },
          { value: "inactive", label: "Inativo" },
        ]}
        {...register("status")}
      />

      {/* Contato */}
      <SectionHeading icon={<Phone size={14} />} title="Contato" />

      <Input
        label="E-mail"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input label="Telefone / WhatsApp" {...register("phone")} />
      <Input
        label="Contato de emergência"
        className="sm:col-span-2"
        {...register("emergency_contact")}
      />

      {/* Acompanhamento */}
      <SectionHeading
        icon={<Stethoscope size={14} />}
        title="Acompanhamento clínico"
      />

      <Input
        label="Valor da sessão (R$)"
        type="number"
        step="0.01"
        placeholder="0,00"
        {...register("session_value")}
      />
      <div className="hidden sm:block" />
      <Textarea
        label="Queixa principal"
        className="sm:col-span-2"
        {...register("main_complaint")}
      />

      {/* Observações confidenciais */}
      <SectionHeading
        icon={<ShieldAlert size={14} />}
        title="Observações confidenciais"
      />

      <Textarea
        label="Anotações privadas"
        hint="Visível apenas para você — nunca compartilhado com o paciente."
        className="sm:col-span-2"
        {...register("notes")}
      />

      {serverError && (
        <p className="rounded-xl bg-dusk-50 px-3 py-2 text-sm text-dusk-600 sm:col-span-2">
          {serverError}
        </p>
      )}

      <div className="flex justify-end gap-3 pt-2 sm:col-span-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : patient ? "Salvar alterações" : "Cadastrar paciente"}
        </Button>
      </div>
    </form>
  );
}
