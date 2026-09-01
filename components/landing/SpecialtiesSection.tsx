"use client";

import { motion } from "framer-motion";
import { Brain, Users, CloudRain, Sparkles, Moon, Heart } from "lucide-react";

const SPECIALTIES = [
  {
    icon: CloudRain,
    title: "Ansiedade e estresse",
    text: "Ferramentas para lidar com a mente acelerada e o excesso de preocupação. Técnicas de regulação e presença.",
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
    featured: false,
    classes: "lg:col-span-12 bg-gradient-to-r from-sage-100 to-dusk-50 border border-sand-200",
    iconClasses: "bg-white text-sage-600",
    titleClasses: "text-ink-800",
    textClasses: "text-ink-700/60",
    wide: true,
  },
];

export function SpecialtiesSection() {
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
            Cada pessoa tem uma história única. O atendimento é adaptado ao que você precisa.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {SPECIALTIES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`flex cursor-default rounded-3xl p-6 transition-shadow hover:shadow-lg ${s.classes} ${s.wide ? "flex-row items-center gap-6" : "flex-col"}`}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
