import { auth } from "@clerk/nextjs/server";
import { CalendarDays, Clock, Laptop, MapPin } from "lucide-react";
import { sql } from "@/lib/db";
import { Badge, sessionStatusTone, sessionStatusLabel } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Patient, Session } from "@/lib/types";

export default async function PortalSessoesPage() {
  const { userId } = await auth();

  const patientRows = await sql`
    SELECT * FROM patients WHERE user_id = ${userId} LIMIT 1
  `;

  if (!patientRows[0]) {
    return (
      <div className="card-soft p-8 text-center">
        <p className="font-display text-lg font-semibold text-ink-800">
          Conta ainda não vinculada
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-700/60">
          Assim que sua psicóloga vincular seu cadastro, suas sessões aparecerão aqui.
        </p>
      </div>
    );
  }

  const p = patientRows[0] as Patient;

  const sessionRows = await sql`
    SELECT * FROM sessions
    WHERE patient_id = ${p.id}
    ORDER BY date DESC, time DESC
  `;

  const sessions = sessionRows as Session[];

  const upcoming = sessions.filter(
    (s) => s.status === "scheduled" || s.status === "confirmed"
  );
  const past = sessions.filter(
    (s) => s.status === "completed" || s.status === "cancelled" || s.status === "no_show"
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-800">
          Suas sessões
        </h1>
        <p className="mt-1 text-sm text-ink-700/60">
          Acompanhe seus agendamentos e histórico.
        </p>
      </div>

      {sessions.length === 0 && (
        <div className="card-soft p-6 text-center text-sm text-ink-700/60">
          Nenhuma sessão registrada ainda.
        </div>
      )}

      {upcoming.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-700/50">
            Próximas
          </h2>
          <div className="card-soft divide-y divide-sand-200">
            {upcoming.map((s) => (
              <SessionRow key={s.id} session={s} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-700/50">
            Histórico
          </h2>
          <div className="card-soft divide-y divide-sand-200">
            {past.map((s) => (
              <SessionRow key={s.id} session={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SessionRow({ session: s }: { session: Session }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sage-100">
          <CalendarDays size={15} className="text-sage-600" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink-800">
            {formatDate(s.date)}
          </p>
          <p className="mt-0.5 flex items-center gap-2 text-xs text-ink-700/50">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {s.time}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              {s.modality === "online" ? (
                <><Laptop size={11} /> Online</>
              ) : (
                <><MapPin size={11} /> Presencial</>
              )}
            </span>
            {s.duration && (
              <>
                <span>·</span>
                <span>{s.duration} min</span>
              </>
            )}
          </p>
        </div>
      </div>
      <Badge tone={sessionStatusTone[s.status]}>{sessionStatusLabel[s.status]}</Badge>
    </div>
  );
}
