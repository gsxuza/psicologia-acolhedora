"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { SessionForm } from "@/components/sessions/SessionForm";
import { SessionRow } from "@/components/sessions/SessionRow";
import { Button } from "@/components/ui/Button";
import type { Patient, Session } from "@/lib/types";

export function SessionsBoard({
  sessions,
  patients,
}: {
  sessions: Session[];
  patients: Patient[];
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant={showForm ? "ghost" : "primary"} onClick={() => setShowForm((v) => !v)}>
          {showForm ? (
            <>
              <X size={16} /> Fechar
            </>
          ) : (
            <>
              <Plus size={16} /> Agendar sessão
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <div className="card-soft animate-fadeUp p-6">
          <SessionForm patients={patients} onCreated={() => setShowForm(false)} />
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="card-soft flex flex-col items-center gap-2 p-12 text-center">
          <p className="font-display text-ink-800">Nenhuma sessão por aqui</p>
          <p className="max-w-sm text-sm text-ink-700/60">
            Agende a próxima sessão de um paciente para começar a preencher sua agenda.
          </p>
        </div>
      ) : (
        <div className="card-soft divide-y divide-sand-200">
          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
