"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";

const TIME_SLOTS = ["09:00", "11:00", "14:00", "16:00"];

function buildUpcomingDays(count: number) {
  const days: { label: string; weekday: string; iso: string }[] = [];
  const today = new Date();
  let cursor = new Date(today);

  while (days.length < count) {
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 1);
    const weekday = cursor.getDay();
    if (weekday === 0 || weekday === 6) continue; // pula fim de semana

    days.push({
      label: cursor.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
      weekday: cursor.toLocaleDateString("pt-BR", { weekday: "short" }),
      iso: cursor.toLocaleDateString("pt-BR"),
    });
  }

  return days;
}

export function ScheduleCTA() {
  const days = useMemo(() => buildUpcomingDays(5), []);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dayData = days.find((d) => d.iso === selectedDay);
  const canConfirm = Boolean(selectedDay && selectedTime);

  const message = canConfirm
    ? `Olá! Gostaria de agendar uma sessão para ${dayData?.weekday}, ${dayData?.label} às ${selectedTime}.`
    : "";

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage-600">
            Agendar sessão
          </p>
          <h2 className="font-display text-3xl font-semibold text-ink-800">
            Escolha um dia e horário
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-700/70">
            Selecione abaixo e confirme pelo WhatsApp — sem compromisso, é só pra agilizar o agendamento.
          </p>
        </div>

        <div className="card-soft mt-8 p-6 sm:p-8">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700/50">
            <Calendar size={13} /> Dia
          </p>
          <div className="flex flex-wrap gap-2">
            {days.map((d) => {
              const isSelected = selectedDay === d.iso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setSelectedDay(d.iso)}
                  className={`flex flex-col items-center rounded-xl border px-4 py-2.5 text-center transition-all ${
                    isSelected
                      ? "border-sage-500 bg-sage-600 text-white"
                      : "border-sand-200 bg-white text-ink-800 hover:border-sage-300"
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                    {d.weekday}
                  </span>
                  <span className="text-sm font-semibold">{d.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mb-3 mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700/50">
            <Clock size={13} /> Horário
          </p>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    isSelected
                      ? "border-sage-500 bg-sage-600 text-white"
                      : "border-sand-200 bg-white text-ink-800 hover:border-sage-300"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: canConfirm ? 1 : 0.4 }}
            className="mt-7"
          >
            <a
              href={canConfirm ? whatsappLink(message) : undefined}
              target={canConfirm ? "_blank" : undefined}
              rel={canConfirm ? "noreferrer" : undefined}
              aria-disabled={!canConfirm}
              onClick={(e) => {
                if (!canConfirm) e.preventDefault();
              }}
              className={`flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-all ${
                canConfirm
                  ? "cursor-pointer bg-sage-600 hover:bg-sage-700"
                  : "cursor-not-allowed bg-ink-700/30"
              }`}
            >
              <MessageCircle size={16} />
              {canConfirm
                ? `Confirmar ${dayData?.weekday}, ${dayData?.label} às ${selectedTime}`
                : "Escolha um dia e horário"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
