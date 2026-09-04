"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { isValidCpf, onlyCpfDigits } from "@/lib/cpf";

function normalizeCpf(cpf: string | undefined) {
  if (!cpf) return null;
  const digits = onlyCpfDigits(cpf);
  if (!digits) return null;
  if (!isValidCpf(digits)) throw new Error("CPF inválido");
  return digits;
}

async function assertCpfNotTaken(userId: string, cpf: string | null, excludeId?: string) {
  if (!cpf) return;
  const rows = await sql`
    SELECT id FROM patients
    WHERE created_by = ${userId} AND cpf = ${cpf}
      AND (${excludeId ?? null}::uuid IS NULL OR id != ${excludeId ?? null}::uuid)
    LIMIT 1
  `;
  if (rows[0]) throw new Error("Já existe um paciente com este CPF");
}

export type PatientPayload = {
  full_name: string;
  email?: string;
  phone?: string;
  cpf?: string;
  birth_date?: string;
  status: "active" | "inactive" | "waiting";
  main_complaint?: string;
  emergency_contact?: string;
  session_value?: number;
  notes?: string;
};

export async function createPatient(data: PatientPayload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const cpf = normalizeCpf(data.cpf);
  await assertCpfNotTaken(userId, cpf);

  const rows = await sql`
    INSERT INTO patients (
      full_name, email, phone, cpf, birth_date, status,
      main_complaint, emergency_contact, session_value, notes, created_by
    ) VALUES (
      ${data.full_name},
      ${data.email || null},
      ${data.phone || null},
      ${cpf},
      ${data.birth_date || null},
      ${data.status},
      ${data.main_complaint || null},
      ${data.emergency_contact || null},
      ${data.session_value ?? null},
      ${data.notes || null},
      ${userId}
    )
    RETURNING id
  `;

  redirect(`/pacientes/${rows[0].id}`);
}

export async function updatePatient(id: string, data: PatientPayload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const cpf = normalizeCpf(data.cpf);
  await assertCpfNotTaken(userId, cpf, id);

  const rows = await sql`
    UPDATE patients SET
      full_name = ${data.full_name},
      email = ${data.email || null},
      phone = ${data.phone || null},
      cpf = ${cpf},
      birth_date = ${data.birth_date || null},
      status = ${data.status},
      main_complaint = ${data.main_complaint || null},
      emergency_contact = ${data.emergency_contact || null},
      session_value = ${data.session_value ?? null},
      notes = ${data.notes || null},
      updated_at = now()
    WHERE id = ${id} AND created_by = ${userId}
    RETURNING id
  `;

  if (!rows[0]) throw new Error("Patient not found");
  redirect(`/pacientes/${rows[0].id}`);
}

export async function deletePatient(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const rows = await sql`
    DELETE FROM patients
    WHERE id = ${id} AND created_by = ${userId}
    RETURNING id
  `;

  if (!rows[0]) throw new Error("Patient not found");
}
