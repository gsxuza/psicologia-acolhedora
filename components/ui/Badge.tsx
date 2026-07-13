import { cn } from "@/lib/utils";

const TONES = {
  sage: "bg-sage-100 text-sage-700",
  mist: "bg-mist-100 text-mist-700",
  dusk: "bg-dusk-100 text-dusk-600",
  neutral: "bg-sand-200 text-ink-700/70",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

// Mapeamentos de status -> tom, reaproveitados nos cards de paciente/sessão
export const patientStatusTone: Record<string, keyof typeof TONES> = {
  active: "sage",
  waiting: "mist",
  inactive: "neutral",
};

export const patientStatusLabel: Record<string, string> = {
  active: "Em acompanhamento",
  waiting: "Em espera",
  inactive: "Inativo",
};

export const sessionStatusTone: Record<string, keyof typeof TONES> = {
  scheduled: "mist",
  confirmed: "sage",
  completed: "sage",
  cancelled: "dusk",
  no_show: "dusk",
};

export const sessionStatusLabel: Record<string, string> = {
  scheduled: "Agendada",
  confirmed: "Confirmada",
  completed: "Concluída",
  cancelled: "Cancelada",
  no_show: "Faltou",
};
