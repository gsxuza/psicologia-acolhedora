"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Video, MapPin } from "lucide-react";
import { updateSessionField } from "@/app/actions/sessions";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
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

const statusColor: Record<SessionStatus, string> = {
  scheduled: "bg-mist-100 text-mist-700",
  confirmed: "bg-sage-100 text-sage-700",
  completed: "bg-sage-100 text-sage-700",
  cancelled: "bg-dusk-100 text-dusk-600",
  no_show: "bg-dusk-100 text-dusk-600",
};

const paymentColor: Record<PaymentStatus, string> = {
  pending: "bg-sand-100 text-ink-700/60",
  paid: "bg-sage-100 text-sage-700",
  waived: "bg-mist-50 text-mist-600",
};

export function SessionRow({ session }: { session: Session }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function updateField(field: "status" | "payment_status", value: string) {
    startTransition(async () => {
      await updateSessionField(session.id, field, value);
      router.refresh();
    });
  }

  const dateLabel = formatDate(session.date);

  return (
    <div className={`flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${isPending ? "opacity-60" : ""}`}>
      {/* Esquerda: avatar + info */}
      <div className="flex items-center gap-3.5">
        {/* Bloco de data */}
        <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-sand-100 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-700/40">
            {dateLabel.split(" ")[2] ?? ""}
          </p>
          <p className="text-base font-bold leading-tight text-ink-800">
            {dateLabel.split(" ")[0]}
          </p>
        </div>

        {/* Avatar + nome */}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage-200 to-mist-200 text-xs font-semibold text-sage-800">
          {initials(session.patient_name)}
        </span>

        <div>
          <p className="text-sm font-medium text-ink-800">{session.patient_name}</p>
          <p className="flex items-center gap-1.5 text-xs text-ink-700/45">
            {session.time} · {session.duration}min ·{" "}
            {session.modality === "online" ? (
              <span className="flex items-center gap-0.5"><Video size={11} /> Online</span>
            ) : (
              <span className="flex items-center gap-0.5"><MapPin size={11} /> Presencial</span>
            )}
          </p>
        </div>
      </div>

      {/* Direita: selects + valor */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          defaultValue={session.status}
          onChange={(e) => updateField("status", e.target.value)}
          className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ring-1 ring-inset ring-transparent transition-colors focus:ring-sage-300 ${statusColor[session.status as SessionStatus] ?? "bg-sand-100 text-ink-700"}`}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          defaultValue={session.payment_status}
          onChange={(e) => updateField("payment_status", e.target.value)}
          className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ring-1 ring-inset ring-transparent transition-colors focus:ring-sage-300 ${paymentColor[session.payment_status as PaymentStatus] ?? "bg-sand-100 text-ink-700"}`}
        >
          {PAYMENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {session.payment_value != null && (
          <span className="min-w-[72px] text-right text-xs font-semibold text-ink-700/60">
            {formatCurrency(session.payment_value)}
          </span>
        )}
      </div>
    </div>
  );
}
