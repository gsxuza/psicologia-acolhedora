"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Patient } from "@/lib/types";
import { Badge, patientStatusLabel, patientStatusTone } from "@/components/ui/Badge";
import { formatCurrency, initials } from "@/lib/utils";

const avatarGradient: Record<string, string> = {
  active: "from-sage-200 to-mist-200 text-sage-800",
  waiting: "from-mist-100 to-mist-200 text-mist-700",
  inactive: "from-sand-200 to-sand-300 text-ink-700/50",
};

export function PatientCard({ patient }: { patient: Patient }) {
  const gradient = avatarGradient[patient.status] ?? avatarGradient.active;

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.18, ease: "easeOut" } }}
    >
      <Link
        href={`/pacientes/${patient.id}`}
        className="group flex items-center gap-4 rounded-2xl border border-sand-200 bg-white p-4 transition-all hover:border-sage-200 hover:shadow-soft"
      >
        {/* Avatar */}
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-semibold ${gradient}`}>
          {initials(patient.full_name)}
        </span>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-medium text-ink-800">{patient.full_name}</p>
            <Badge tone={patientStatusTone[patient.status]}>
              {patientStatusLabel[patient.status]}
            </Badge>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-ink-700/45">
            {patient.phone && (
              <span className="flex items-center gap-1">
                <Phone size={11} /> {patient.phone}
              </span>
            )}
            {patient.email && (
              <span className="flex items-center gap-1 truncate">
                <Mail size={11} /> {patient.email}
              </span>
            )}
            {patient.session_value != null && (
              <span className="ml-auto font-medium text-ink-700/60">
                {formatCurrency(patient.session_value)}/sessão
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight
          size={16}
          className="shrink-0 text-ink-700/20 transition-transform group-hover:translate-x-0.5 group-hover:text-sage-500"
        />
      </Link>
    </motion.div>
  );
}
