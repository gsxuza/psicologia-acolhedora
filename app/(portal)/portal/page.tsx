import Link from "next/link";
import { CalendarDays, FileText } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { PortalThermometerCard } from "@/components/portal/PortalThermometerCard";
import { Badge, sessionStatusLabel, sessionStatusTone } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Patient, PatientDocument, Session } from "@/lib/types";

export default async function PortalHomePage() {
  const { userId } = await auth();

  const patientRows = await sql`
    SELECT * FROM patients WHERE user_id = ${userId} LIMIT 1
  `;

  if (!patientRows[0]) {
    return (
      <div className="card-soft p-8 text-center">
        <p className="font-display text-lg font-semibold text-ink-800">
          Sua conta ainda não está vinculada
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-700/60">
          Assim que sua psicóloga vincular seu cadastro de paciente a este e-mail,
          suas sessões e seu histórico aparecerão aqui automaticamente.
        </p>
      </div>
    );
  }

  const p = patientRows[0] as Patient;

  const [sessionRows, documentRows] = await Promise.all([
    sql`SELECT * FROM sessions WHERE patient_id = ${p.id} ORDER BY date DESC LIMIT 5`,
    sql`SELECT * FROM documents WHERE patient_id = ${p.id} AND is_public = true`,
  ]);

  const sessionList = sessionRows as Session[];
  const documentList = documentRows as PatientDocument[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-800">
          Olá, {p.full_name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-ink-700/60">
          Um espaço só seu para acompanhar como você está.
        </p>
      </div>

      <PortalThermometerCard patientId={p.id} ownerId={p.created_by} userId={userId!} />

      <section>
        <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-ink-800">
          <CalendarDays size={17} /> Suas sessões
        </h2>
        {sessionList.length === 0 ? (
          <p className="card-soft p-5 text-sm text-ink-700/60">
            Nenhuma sessão registrada ainda.
          </p>
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

      {documentList.length > 0 && (
        <section>
          <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-ink-800">
            <FileText size={17} /> Materiais para você
          </h2>
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
              </a>
            ))}
          </div>
        </section>
      )}

      <Link href="/portal/termometro" className="btn-secondary inline-flex">
        Ver meu histórico completo do termômetro
      </Link>
    </div>
  );
}
