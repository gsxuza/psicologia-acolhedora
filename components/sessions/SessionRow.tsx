"use client";

import { useRouter } from "next/navigation";
import { Video, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PaymentStatus, Session, SessionStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: SessionStatus; label: string }[] = [
  { value: "scheduled", label: "Agendada" },
  { value: "confirmed", label: "Confirmada" },
  { value: "completed", label: "Concluída" },
  { value: "cancelled", label: "Cancelada" },
  { value: "no_show", label: "Faltou" },
];

const PAYMENT_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: "pending", label: "Pendente" },
  { value: "paid", label: "Pago" },
  { value: "waived", label: "Isento" },
];

export function SessionRow({ session }: { session: Session }) {
  const supabase = createClient();
  const router = useRouter();

  async function updateField(field: "status" | "payment_status", value: string) {
    await supabase.from("sessions").update({ [field]: value }).eq("id", session.id);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50 text-xs font-semibold text-sage-700">
          {formatDate(session.date).slice(0, 6)}
        </span>
        <div>
          <p className="text-sm font-medium text-ink-800">{session.patient_name}</p>
          <p className="flex items-center gap-1.5 text-xs text-ink-700/55">
            {session.time} · {session.duration}min ·{" "}
            {session.modality === "online" ? (
              <span className="flex items-center gap-1">
                <Video size={12} /> Online
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <MapPin size={12} /> Presencial
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          defaultValue={session.status}
          onChange={(e) => updateField("status", e.target.value)}
          className="rounded-lg border border-sand-300 bg-white px-2.5 py-1.5 text-xs text-ink-700"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          defaultValue={session.payment_status}
          onChange={(e) => updateField("payment_status", e.target.value)}
          className="rounded-lg border border-sand-300 bg-white px-2.5 py-1.5 text-xs text-ink-700"
        >
          {PAYMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="w-20 text-right text-xs font-medium text-ink-700/70">
          {formatCurrency(session.payment_value)}
        </span>
      </div>
    </div>
  );
}
