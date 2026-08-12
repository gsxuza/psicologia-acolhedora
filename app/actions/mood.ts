"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export async function createMoodCheckin({
  patientId,
  ownerId,
  mood,
}: {
  patientId: string;
  ownerId: string;
  mood: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  await sql`
    INSERT INTO mood_checkins (patient_id, user_id, owner_id, mood)
    VALUES (${patientId}, ${userId}, ${ownerId}, ${mood})
  `;
}
