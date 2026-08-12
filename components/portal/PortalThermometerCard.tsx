"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { EmotionalThermometer } from "@/components/thermometer/EmotionalThermometer";
import { createMoodCheckin } from "@/app/actions/mood";

export function PortalThermometerCard({
  patientId,
  ownerId,
  userId,
}: {
  patientId: string;
  ownerId: string;
  userId: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  async function handleCheckIn(mood: number) {
    startTransition(async () => {
      await createMoodCheckin({ patientId, ownerId, mood });
      router.refresh();
    });
  }

  return <EmotionalThermometer onCheckIn={handleCheckIn} />;
}
