import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Cake,
  Phone,
  Mail,
  ShieldAlert,
  FileText,
  Video,
  MapPin,
  ExternalLink,
  CalendarDays,
  Gauge,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { Header } from "@/components/layout/Header";
import {
  Badge,
  patientStatusLabel,
  patientStatusTone,
  sessionStatusLabel,
  sessionStatusTone,
} from "@/components/ui/Badge";
import { MoodHistoryChart } from "@/components/portal/MoodHistoryChart";
import { DeletePatientButton } from "@/components/patients/DeletePatientButton";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import type { MoodCheckin, Patient, PatientDocument, Session } from "@/lib/types";

// Duplicated from EmotionalThermometer's MOOD_LEVELS on purpose: indexing into a
// value imported from a "use client" module throws in this server component.
const MOOD_LABELS = ["Muito difícil", "Baixo", "Neutro", "Bem", "Muito bem"];

const avatarGradient: Record<string, string> = {
  active: "from-sage-200 to-mist-200 text-sage-800",
  waiting: "from-mist-100 to-mist-200 text-mist-700",
  inactive: "from-sand-200 to-sand-300 text-ink-700/50",
};

const paymentLabel: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  waived: "Isento",
};

const paymentColor: Record<string, string> = {
  pending: "text-dusk-500",
  paid: "text-sage-600",
  waived: "text-mist-600",
};

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();

  const [patientRows, sessionRows, documentRows, moodRows] = await Promise.all([
    sql`SELECT * FROM patients WHERE id = ${params.id} AND created_by = ${userId} LIMIT 1`,
    sql`SELECT * FROM sessions WHERE patient_id = ${params.id} ORDER BY date DESC LIMIT 10`,
    sql`SELECT * FROM documents WHERE patient_id = ${params.id} ORDER BY created_at DESC`,
    sql`SELECT * FROM mood_checkins WHERE patient_id = ${params.id} ORDER BY created_at DESC LIMIT 30`,
  ]);

  if (!patientRows[0]) notFound();

  const p = patientRows[0] as Patient;
  const sessionList = sessionRows as Session[];
  const documentList = documentRows as PatientDocument[];
  const moodList = moodRows as MoodCheckin[];
  const latestMood = moodList[0];

  const gradient = avatarGradient[p.status] ?? avatarGradient.active;
  const totalSessions = sessionList.length;
  const completedSessions = sessionList.filter(
    (s) => s.status === "completed"
  ).length;

  return (
    <>
      <Header title={p.full_name} subtitle="Ficha do paciente" />

      <main className="flex-1 space-y-5 p-4 sm:p-6">
        {/* Voltar */}
        <Link
          href="/pacientes"
          className="inline-flex items-center gap-1.5 text-sm text-ink-700/50 transition-colors hover:text-ink-700"
        >
          <ArrowLeft size={14} /> Pacientes
        </Link>

        {/* Hero card */}
        <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {/* Faixa de cor no topo baseada no status */}
          <div
            className={`h-1.5 w-full ${
              p.status === "active"
                ? "bg-sage-500"
                : p.status === "waiting"
                ? "bg-mist-400"
                : "bg-sand-300"
            }`}
          />

          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
            {/* Esquerda: avatar + info */}
            <div className="flex items-start gap-4">
              {/* Avatar grande */}
              <span
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-semibold ${gradient}`}
              >
                {initials(p.full_name)}
              </span>

              <div className="space-y-2">
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink-800">
                    {p.full_name}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge tone={patientStatusTone[p.status]}>
                      {patientStatusLabel[p.status]}
                    </Badge>
                    {p.session_value != null && (
                      <span className="text-sm font-medium text-ink-700/60">
                        {formatCurrency(p.session_value)}/sessão
                      </span>
                    )}
                  </div>
                </div>

                {/* Contatos */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-700/60">
                  {p.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-ink-700/35" /> {p.phone}
                    </span>
                  )}
                  {p.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail size={13} className="text-ink-700/35" /> {p.email}
                    </span>
                  )}
                  {p.birth_date && (
                    <span className="flex items-center gap-1.5">
                      <Cake size={13} className="text-ink-700/35" />{" "}
                      {formatDate(p.birth_date)}
                    </span>
                  )}
                  {p.emergency_contact && (
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert size={13} className="text-ink-700/35" />{" "}
                      {p.emergency_contact}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Editar / Excluir */}
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/pacientes/${p.id}/editar`}
                className="inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-sm transition-all hover:border-sage-300 hover:text-sage-700"
              >
                <Pencil size={14} /> Editar
              </Link>
              <DeletePatientButton patient={p} />
            </div>
          </div>

          {/* Stats rápidas */}
          <div className="grid grid-cols-3 divide-x divide-sand-100 border-t border-sand-100">
            <div className="px-5 py-3 text-center">
              <p className="text-xs text-ink-700/40">Sessões</p>
              <p className="mt-0.5 font-display text-lg font-semibold text-ink-800">
                {totalSessions}
              </p>
            </div>
            <div className="px-5 py-3 text-center">
              <p className="text-xs text-ink-700/40">Concluídas</p>
              <p className="mt-0.5 font-display text-lg font-semibold text-ink-800">
                {completedSessions}
              </p>
            </div>
            <div className="px-5 py-3 text-center">
              <p className="text-xs text-ink-700/40">Documentos</p>
              <p className="mt-0.5 font-display text-lg font-semibold text-ink-800">
                {documentList.length}
              </p>
            </div>
          </div>
        </div>

        {/* Queixa principal */}
        {p.main_complaint && (
          <div className="rounded-2xl border border-sand-200 bg-white p-5">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink-700/35">
              Queixa principal
            </p>
            <p className="text-sm leading-relaxed text-ink-700/80">
              {p.main_complaint}
            </p>
          </div>
        )}

        {/* Observações confidenciais */}
        {p.notes && (
          <div className="rounded-2xl border border-dusk-100 bg-dusk-50/40 p-5">
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-dusk-500/70">
              <ShieldAlert size={12} /> Observações confidenciais
            </p>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700/80">
              {p.notes}
            </p>
          </div>
        )}

        {/* Sessões + Documentos */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Sessões recentes */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-sm font-semibold text-ink-800">
                <CalendarDays size={15} className="text-ink-700/40" /> Sessões
                recentes
              </h2>
              <Link
                href="/sessoes"
                className="text-xs font-medium text-sage-600 hover:underline"
              >
                Ver agenda →
              </Link>
            </div>

            {sessionList.length === 0 ? (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-white py-10 text-sm text-ink-700/40">
                Nenhuma sessão registrada
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white divide-y divide-sand-100">
                {sessionList.map((s) => {
                  const dateLabel = formatDate(s.date);
                  const parts = dateLabel.split(" ");
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-3.5 px-4 py-3"
                    >
                      {/* Bloco de data */}
                      <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-sand-100 text-center">
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-700/40">
                          {parts[2] ?? ""}
                        </p>
                        <p className="text-sm font-bold leading-tight text-ink-800">
                          {parts[0]}
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink-800">
                          {s.time} · {s.duration}min
                        </p>
                        <p className="flex items-center gap-1 text-xs text-ink-700/45">
                          {s.modality === "online" ? (
                            <><Video size={10} /> Online</>
                          ) : (
                            <><MapPin size={10} /> Presencial</>
                          )}
                          {s.payment_status && (
                            <span className={`ml-1.5 ${paymentColor[s.payment_status] ?? ""}`}>
                              · {paymentLabel[s.payment_status]}
                            </span>
                          )}
                        </p>
                      </div>

                      <Badge tone={sessionStatusTone[s.status]}>
                        {sessionStatusLabel[s.status]}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Documentos */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-sm font-semibold text-ink-800">
                <FileText size={15} className="text-ink-700/40" /> Documentos
              </h2>
              <Link
                href="/documentos"
                className="text-xs font-medium text-sage-600 hover:underline"
              >
                Gerenciar →
              </Link>
            </div>

            {documentList.length === 0 ? (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-white py-10 text-sm text-ink-700/40">
                Nenhum documento vinculado
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white divide-y divide-sand-100">
                {documentList.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-sand-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand-100">
                      <FileText size={15} className="text-ink-700/40" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink-800">
                        {doc.title}
                      </p>
                      <p className="text-xs capitalize text-ink-700/45">
                        {doc.category}
                      </p>
                    </div>
                    <ExternalLink size={13} className="shrink-0 text-ink-700/25" />
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Termômetro emocional */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold text-ink-800">
              <Gauge size={15} className="text-ink-700/40" /> Termômetro emocional
            </h2>
            {latestMood && (
              <span className="text-xs font-medium text-ink-700/50">
                Último registro: {MOOD_LABELS[latestMood.mood - 1] ?? "—"} ·{" "}
                {formatDate(latestMood.created_at.slice(0, 10))}
              </span>
            )}
          </div>

          {moodList.length === 0 ? (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-sand-300 bg-white py-10 text-sm text-ink-700/40">
              Nenhum check-in emocional registrado
            </div>
          ) : (
            <div className="rounded-2xl border border-sand-200 bg-white p-5">
              <MoodHistoryChart checkins={moodList} />
              {latestMood?.note && (
                <p className="mt-4 rounded-xl bg-sand-50 p-3 text-sm italic text-ink-700/70">
                  “{latestMood.note}”
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
