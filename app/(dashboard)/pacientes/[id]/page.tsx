import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Cake, Phone, Mail, ShieldAlert, FileText, CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/Header";
import { Badge, patientStatusLabel, patientStatusTone, sessionStatusLabel, sessionStatusTone } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Patient, PatientDocument, Session } from "@/lib/types";

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const [{ data: patient }, { data: sessions }, { data: documents }] = await Promise.all([
    supabase.from("patients").select("*").eq("id", params.id).single(),
    supabase
      .from("sessions")
      .select("*")
      .eq("patient_id", params.id)
      .order("date", { ascending: false })
      .limit(10),
    supabase.from("documents").select("*").eq("patient_id", params.id),
  ]);

  if (!patient) notFound();

  const p = patient as Patient;
  const sessionList = (sessions ?? []) as Session[];
  const documentList = (documents ?? []) as PatientDocument[];

  return (
    <>
      <Header title={p.full_name} subtitle="Ficha do paciente" />

      <main className="flex-1 space-y-6 p-6">
        <div className="card-soft flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={patientStatusTone[p.status]}>{patientStatusLabel[p.status]}</Badge>
              {p.session_value != null && (
                <span className="text-sm text-ink-700/60">
                  {formatCurrency(p.session_value)} / sessão
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm text-ink-700/70 sm:grid-cols-2">
              {p.phone && (
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-ink-700/40" /> {p.phone}
                </span>
              )}
              {p.email && (
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-ink-700/40" /> {p.email}
                </span>
              )}
              {p.birth_date && (
                <span className="flex items-center gap-2">
                  <Cake size={14} className="text-ink-700/40" /> {formatDate(p.birth_date)}
                </span>
              )}
              {p.emergency_contact && (
                <span className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-ink-700/40" /> {p.emergency_contact}
                </span>
              )}
            </div>

            {p.main_complaint && (
              <p className="max-w-2xl text-sm text-ink-700/70">
                <span className="font-medium text-ink-800">Queixa principal: </span>
                {p.main_complaint}
              </p>
            )}
          </div>

          <Link href={`/pacientes/${p.id}/editar`} className="btn-secondary shrink-0">
            <Pencil size={15} /> Editar
          </Link>
        </div>

        {p.notes && (
          <div className="card-soft p-5">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-700/40">
              Observações confidenciais
            </p>
            <p className="whitespace-pre-line text-sm text-ink-700/80">{p.notes}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-ink-800">
              <CalendarDays size={17} /> Sessões recentes
            </h2>
            {sessionList.length === 0 ? (
              <p className="card-soft p-5 text-sm text-ink-700/60">Nenhuma sessão registrada.</p>
            ) : (
              <div className="card-soft divide-y divide-sand-200">
                {sessionList.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium text-ink-800">
                        {formatDate(s.date)} · {s.time}
                      </p>
                      <p className="text-xs text-ink-700/50">
                        {s.modality === "online" ? "Online" : "Presencial"}
                      </p>
                    </div>
                    <Badge tone={sessionStatusTone[s.status]}>{sessionStatusLabel[s.status]}</Badge>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-ink-800">
              <FileText size={17} /> Documentos
            </h2>
            {documentList.length === 0 ? (
              <p className="card-soft p-5 text-sm text-ink-700/60">
                Nenhum documento vinculado a este paciente.
              </p>
            ) : (
              <div className="card-soft divide-y divide-sand-200">
                {documentList.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 hover:bg-sand-50"
                  >
                    <span className="text-sm font-medium text-ink-800">{doc.title}</span>
                    <span className="text-xs capitalize text-ink-700/50">{doc.category}</span>
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
