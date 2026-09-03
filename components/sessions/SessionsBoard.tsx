"use client";

import { useState } from "react";
import { Plus, X, CalendarPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SessionForm } from "@/components/sessions/SessionForm";
import { SessionRow } from "@/components/sessions/SessionRow";
import type { Patient, Session } from "@/lib/types";

export function SessionsBoard({
  sessions,
  patients,
}: {
  sessions: Session[];
  patients: Patient[];
}) {
  const [showForm, setShowForm] = useState(false);
  const phoneByPatientId = new Map(patients.map((p) => [p.id, p.phone]));

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-700/50">
          {sessions.length} sessão{sessions.length !== 1 ? "ões" : ""} encontrada{sessions.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setShowForm((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            showForm
              ? "bg-sand-200 text-ink-700 hover:bg-sand-300"
              : "bg-sage-600 text-white shadow-lg shadow-sage-600/20 hover:bg-sage-700"
          }`}
        >
          {showForm ? <><X size={15} /> Fechar</> : <><Plus size={15} /> Agendar sessão</>}
        </button>
      </div>

      {/* Formulário com animação */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden rounded-2xl border border-sage-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-5 font-display text-base font-semibold text-ink-800">
              Nova sessão
            </h3>
            <SessionForm patients={patients} onCreated={() => setShowForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista */}
      {sessions.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-sand-300 bg-white py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100">
            <CalendarPlus size={24} className="text-ink-700/30" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-ink-800">Nenhuma sessão ainda</p>
            <p className="mt-1 max-w-sm text-sm text-ink-700/50">
              Agende a próxima sessão de um paciente para começar a preencher sua agenda.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-sand-200 bg-white divide-y divide-sand-100">
          {sessions.map((session) => (
            <SessionRow
              key={session.id}
              session={session}
              patientPhone={phoneByPatientId.get(session.patient_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
