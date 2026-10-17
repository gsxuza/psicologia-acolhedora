"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Users, CloudRain, Sparkles, Moon, Heart, X, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";

const SPECIALTIES = [
  {
    icon: CloudRain,
    title: "Ansiedade e estresse",
    text: "Ferramentas para lidar com a mente acelerada e o excesso de preocupação. Técnicas de regulação e presença.",
    detail:
      "Trabalhamos juntas técnicas de regulação emocional e presença para reduzir a sensação de estar sempre em alerta — identificando gatilhos, criando pausas reais no seu dia e reconstruindo uma relação mais calma com seus próprios pensamentos.",
    featured: true,
    classes: "lg:col-span-7 bg-ink-900 text-white",
    iconClasses: "bg-white/10 text-white",
    titleClasses: "text-white text-xl",
    textClasses: "text-white/60",
  },
  {
    icon: Heart,
    title: "Relacionamentos",
    text: "Vínculos afetivos, familiares e de casal com mais clareza e comunicação.",
    detail:
      "Seja num relacionamento de casal, na família ou nas amizades, o foco é entender seus próprios padrões de vínculo e desenvolver formas mais claras e saudáveis de se comunicar e colocar limites.",
    featured: false,
    classes: "lg:col-span-5 bg-dusk-50 border border-dusk-100",
    iconClasses: "bg-dusk-100 text-dusk-500",
    titleClasses: "text-ink-800",
    textClasses: "text-ink-700/60",
  },
  {
    icon: Moon,
    title: "Luto e perdas",
    text: "Um espaço seguro para elaborar perdas no seu próprio tempo.",
    detail:
      "Perdas — de uma pessoa, de uma fase da vida, de um projeto — pedem tempo e acolhimento, não pressa. Este é um espaço para elaborar o luto sem julgamento, no ritmo que for possível para você.",
    featured: false,
    classes: "lg:col-span-4 bg-white border border-sand-200",
    iconClasses: "bg-sand-100 text-ink-700/70",
    titleClasses: "text-ink-800",
    textClasses: "text-ink-700/60",
  },
  {
    icon: Sparkles,
    title: "Autoestima",
    text: "Reconstruir a relação consigo mesmo com mais gentileza.",
    detail:
      "Autocrítica excessiva, dificuldade em reconhecer suas próprias qualidades, comparação constante — a terapia ajuda a reconstruir uma relação mais gentil e realista com você mesmo(a).",
    featured: false,
    classes: "lg:col-span-4 bg-sage-50 border border-sage-100",
    iconClasses: "bg-sage-100 text-sage-600",
    titleClasses: "text-ink-800",
    textClasses: "text-ink-700/60",
  },
  {
    icon: Users,
    title: "Transições de vida",
    text: "Mudanças de carreira, rotina e identidade ao longo da vida.",
    detail:
      "Trocar de carreira, se mudar de cidade, virar pai ou mãe, se aposentar — qualquer transição grande mexe com a identidade. Vamos atravessar essa mudança com mais clareza sobre quem você está se tornando.",
    featured: false,
    classes: "lg:col-span-4 bg-mist-50 border border-mist-100",
    iconClasses: "bg-mist-100 text-mist-600",
    titleClasses: "text-ink-800",
    textClasses: "text-ink-700/60",
  },
  {
    icon: Brain,
    title: "Regulação emocional",
    text: "Entender e acolher emoções intensas sem ser dominado por elas.",
    detail:
      "Raiva, tristeza ou ansiedade intensas podem parecer incontroláveis. Aqui você desenvolve ferramentas práticas para identificar, nomear e acolher essas emoções sem ser dominado por elas.",
    featured: false,
    classes: "lg:col-span-12 bg-gradient-to-r from-sage-100 to-dusk-50 border border-sand-200",
    iconClasses: "bg-white text-sage-600",
    titleClasses: "text-ink-800",
    textClasses: "text-ink-700/60",
    wide: true,
  },
];

export function SpecialtiesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? SPECIALTIES[openIndex] : null;

  return (
    <section id="especialidades" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage-600"
            >
              Especialidades
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display text-4xl font-semibold text-ink-800"
            >
              Áreas de atuação
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xs text-sm text-ink-700/55 sm:text-right"
          >
            Cada pessoa tem uma história única. O atendimento é adaptado ao que você precisa — toque num card para saber mais.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {SPECIALTIES.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex cursor-pointer rounded-3xl p-6 text-left transition-shadow hover:shadow-lg ${s.classes} ${s.wide ? "flex-row items-center gap-6" : "flex-col"}`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${s.iconClasses}`}>
                <s.icon size={20} />
              </span>
              <div className={s.wide ? "" : "mt-5"}>
                <h3 className={`font-display font-semibold ${s.titleClasses} ${s.featured ? "text-xl" : "text-base"}`}>
                  {s.title}
                </h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${s.textClasses}`}>{s.text}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal de detalhe */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpenIndex(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="specialty-modal-title"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpenIndex(null);
              }}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active.iconClasses.includes("white") ? "bg-sage-100 text-sage-600" : active.iconClasses}`}>
                  <active.icon size={20} />
                </span>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpenIndex(null)}
                  aria-label="Fechar"
                  className="rounded-full p-1.5 text-ink-700/40 transition-colors hover:bg-sand-100 hover:text-ink-700"
                >
                  <X size={18} />
                </button>
              </div>
              <h3 id="specialty-modal-title" className="mt-4 font-display text-xl font-semibold text-ink-800">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/65">{active.detail}</p>
              <a
                href={whatsappLink(`Olá! Gostaria de conversar sobre: ${active.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sage-700"
              >
                <MessageCircle size={15} />
                Conversar sobre isso
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
