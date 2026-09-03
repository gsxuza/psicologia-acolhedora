"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";

function normalizeCpf(cpf: string | undefined) {
  if (!cpf) return null;
  const digits = cpf.replace(/\D/g, "");
  return digits || null;
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

  const rows = await sql`
    INSERT INTO patients (
      full_name, email, phone, cpf, birth_date, status,
      main_complaint, emergency_contact, session_value, notes, created_by
    ) VALUES (
      ${data.full_name},
      ${data.email || null},
      ${data.phone || null},
      ${normalizeCpf(data.cpf)},
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

  const rows = await sql`
    UPDATE patients SET
      full_name = ${data.full_name},
      email = ${data.email || null},
      phone = ${data.phone || null},
      cpf = ${normalizeCpf(data.cpf)},
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
