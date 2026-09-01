"use client";

import Link from "next/link";
import { Video, MapPin, CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";
import type { Session } from "@/lib/types";
import { Badge, sessionStatusLabel, sessionStatusTone } from "@/components/ui/Badge";
import { formatDate, initials } from "@/lib/utils";

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function UpcomingSessions({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-sand-300 bg-white py-14 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-100">
          <CalendarPlus size={22} className="text-ink-700/30" />
        </div>
        <div>
          <p className="font-display font-semibold text-ink-800">Nenhuma sessão agendada</p>
          <p className="mt-1 text-sm text-ink-700/50">Agende a próxima sessão com um paciente.</p>
        </div>
        <Link
          href="/sessoes"
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-sage-600 px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ver agenda
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-2xl border border-sand-200 bg-white"
    >
      {sessions.map((session, i) => (
        <motion.div
          key={session.id}
          variants={rowVariants}
          className={`flex items-center justify-between gap-4 px-5 py-4 ${
            i < sessions.length - 1 ? "border-b border-sand-100" : ""
          }`}
        >
          {/* Avatar + info */}
          <div className="flex items-center gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sage-200 to-mist-200 text-xs font-semibold text-sage-800">
              {initials(session.patient_name)}
            </span>
            <div>
              <p className="text-sm font-medium text-ink-800">{session.patient_name}</p>
              <p className="text-xs text-ink-700/50">
                {formatDate(session.date)} · {session.time}
              </p>
            </div>
          </div>

          {/* Modalidade + status */}
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-xs text-ink-700/50 sm:flex">
              {session.modality === "online" ? <Video size={12} /> : <MapPin size={12} />}
              {session.modality === "online" ? "Online" : "Presencial"}
            </span>
            <Badge tone={sessionStatusTone[session.status]}>
              {sessionStatusLabel[session.status]}
            </Badge>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
