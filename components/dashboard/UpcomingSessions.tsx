import Link from "next/link";
import { Clock, Video, MapPin } from "lucide-react";
import type { Session } from "@/lib/types";
import { Badge, sessionStatusLabel, sessionStatusTone } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function UpcomingSessions({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) {
    return (
      <div className="card-soft flex flex-col items-center justify-center gap-2 p-10 text-center">
        <p className="font-display text-ink-800">Nenhuma sessão agendada</p>
        <p className="max-w-xs text-sm text-ink-700/60">
          Que tal agendar a próxima sessão com um paciente?
        </p>
        <Link href="/sessoes" className="btn-secondary mt-2">
          Ver agenda
        </Link>
      </div>
    );
  }

  return (
    <div className="card-soft divide-y divide-sand-200">
      {sessions.map((session) => (
        <div key={session.id} className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-mist-50 text-mist-700">
              <Clock size={16} />
            </span>
            <div>
              <p className="text-sm font-medium text-ink-800">{session.patient_name}</p>
              <p className="text-xs text-ink-700/60">
                {formatDate(session.date)} às {session.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1 text-xs text-ink-700/50 sm:flex">
              {session.modality === "online" ? <Video size={13} /> : <MapPin size={13} />}
              {session.modality === "online" ? "Online" : "Presencial"}
            </span>
            <Badge tone={sessionStatusTone[session.status]}>
              {sessionStatusLabel[session.status]}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
