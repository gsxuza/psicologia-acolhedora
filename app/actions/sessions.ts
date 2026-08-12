"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export type SessionPayload = {
  patient_id: string;
  patient_name: string;
  date: string;
  time: string;
  duration: number;
  modality: "online" | "presencial";
  payment_value?: number | null;
};

export async function createSession(data: SessionPayload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  await sql`
    INSERT INTO sessions (
      patient_id, patient_name, date, time, duration,
      modality, payment_value, created_by
    ) VALUES (
      ${data.patient_id},
      ${data.patient_name},
      ${data.date},
      ${data.time},
      ${data.duration},
      ${data.modality},
      ${data.payment_value ?? null},
      ${userId}
    )
  `;
}

export async function updateSessionField(
  id: string,
  field: "status" | "payment_status",
  value: string
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  if (field === "status") {
    await sql`UPDATE sessions SET status = ${value}, updated_at = now() WHERE id = ${id} AND created_by = ${userId}`;
  } else {
    await sql`UPDATE sessions SET payment_status = ${value}, updated_at = now() WHERE id = ${id} AND created_by = ${userId}`;
  }
}
