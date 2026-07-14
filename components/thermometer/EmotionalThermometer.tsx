"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MoodLevel {
  value: number; // 1-5
  label: string;
  message: string;
  color: string; // tailwind bg class for the thumb/track fill
  glow: string; // tailwind bg class (soft) for the message card background
}

export const MOOD_LEVELS: MoodLevel[] = [
  {
    value: 1,
    label: "Muito difícil",
    message:
      "Está tudo bem não estar bem. Respire fundo — você não precisa carregar isso sozinho(a).",
    color: "bg-mist-500",
    glow: "bg-mist-50",
  },
  {
    value: 2,
    label: "Baixo",
    message:
      "Dias assim pesam mais. Seja gentil com você e, se puder, converse com alguém de confiança hoje.",
    color: "bg-mist-400",
    glow: "bg-mist-50",
  },
  {
    value: 3,
    label: "Neutro",
    message:
      "Nem tudo precisa ter um rótulo forte. Um momento de pausa também é válido.",
    color: "bg-sand-300",
    glow: "bg-sand-100",
  },
  {
    value: 4,
    label: "Bem",
    message:
      "Que bom sentir isso. Vale anotar o que ajudou a chegar até aqui hoje.",
    color: "bg-sage-400",
    glow: "bg-sage-50",
  },
  {
    value: 5,
    label: "Muito bem",
    message:
      "Aproveite esse momento — reconhecer o que está bem também é parte do cuidado com você.",
    color: "bg-dusk-400",
    glow: "bg-dusk-50",
  },
];

export function EmotionalThermometer({
  onCheckIn,
  compact = false,
}: {
  onCheckIn?: (mood: number) => void | Promise<void>;
  compact?: boolean;
}) {
  const [value, setValue] = useState(3);
  const [confirmed, setConfirmed] = useState(false);
  const current = MOOD_LEVELS[value - 1];
  const percent = ((value - 1) / (MOOD_LEVELS.length - 1)) * 100;

  async function handleConfirm() {
    setConfirmed(true);
    await onCheckIn?.(value);
    setTimeout(() => setConfirmed(false), 2500);
  }

  return (
    <div className={cn("card-soft p-6", compact ? "p-5" : "p-6 sm:p-8")}>
      <p className="mb-1 font-display text-lg font-semibold text-ink-800">
        Como você está se sentindo agora?
      </p>
      <p className="mb-6 text-sm text-ink-700/60">
        Arraste para escolher o ponto que mais combina com seu momento.
      </p>

      {/* Trilha do termômetro */}
      <div className="relative mb-3 h-3 w-full rounded-full bg-gradient-to-r from-mist-300 via-sand-300 to-dusk-300">
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Selecione seu estado emocional"
          className="absolute inset-0 h-3 w-full cursor-pointer opacity-0"
        />
        <motion.div
          className={cn(
            "pointer-events-none absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-4 border-white shadow-soft",
            current.color
          )}
          animate={{ left: `calc(${percent}% - ${percent / 100} * 28px)` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ left: `calc(${percent}% - 14px)` }}
        />
      </div>

      <div className="mb-6 flex justify-between px-0.5 text-[11px] text-ink-700/45">
        <span>Muito difícil</span>
        <span>Muito bem</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className={cn("rounded-xl p-4", current.glow)}
        >
          <p className="text-sm font-medium text-ink-800">{current.label}</p>
          <p className="mt-1 text-sm text-ink-700/70">{current.message}</p>
        </motion.div>
      </AnimatePresence>

      {onCheckIn && (
        <button onClick={handleConfirm} className="btn-primary mt-5 w-full sm:w-auto">
          {confirmed ? "Registrado ✓" : "Registrar meu estado de hoje"}
        </button>
      )}
    </div>
  );
}
