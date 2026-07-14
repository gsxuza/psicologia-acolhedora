"use client";

import { useRouter } from "next/navigation";
import { EmotionalThermometer } from "@/components/thermometer/EmotionalThermometer";
import { createClient } from "@/lib/supabase/client";

export function PortalThermometerCard({
  patientId,
  ownerId,
  userId,
}: {
  patientId: string;
  ownerId: string;
  userId: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  async function handleCheckIn(mood: number) {
    await supabase.from("mood_checkins").insert({
      patient_id: patientId,
      user_id: userId,
      owner_id: ownerId,
      mood,
    });
    router.refresh();
  }

  return <EmotionalThermometer onCheckIn={handleCheckIn} />;
}
