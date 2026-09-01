"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export type DocumentPayload = {
  title: string;
  category: "orientacao" | "material" | "contrato" | "outro";
  patient_id?: string;
  is_public?: boolean;
  file_url: string;
};

export async function createDocument(data: DocumentPayload) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  await sql`
    INSERT INTO documents (
      title, category, patient_id, is_public, file_url, created_by
    ) VALUES (
      ${data.title},
      ${data.category},
      ${data.patient_id || null},
      ${data.is_public ?? false},
      ${data.file_url},
      ${userId}
    )
  `;
}

export async function deleteDocument(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  await sql`DELETE FROM documents WHERE id = ${id} AND created_by = ${userId}`;
}
