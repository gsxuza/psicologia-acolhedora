import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { Patient } from "@/lib/types";
import { Badge, patientStatusLabel, patientStatusTone } from "@/components/ui/Badge";
import { formatCurrency, initials } from "@/lib/utils";

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Link
      href={`/pacientes/${patient.id}`}
      className="card-soft flex items-center justify-between gap-4 p-4 transition-shadow hover:shadow-soft"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sm font-semibold text-sage-700">
          {initials(patient.full_name)}
        </span>
        <div>
          <p className="font-medium text-ink-800">{patient.full_name}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-ink-700/55">
            {patient.phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} /> {patient.phone}
              </span>
            )}
            {patient.email && (
              <span className="flex items-center gap-1">
                <Mail size={12} /> {patient.email}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5">
        <Badge tone={patientStatusTone[patient.status]}>
          {patientStatusLabel[patient.status]}
        </Badge>
        {patient.session_value != null && (
          <span className="text-xs text-ink-700/50">
            {formatCurrency(patient.session_value)} / sessão
          </span>
        )}
      </div>
    </Link>
  );
}
