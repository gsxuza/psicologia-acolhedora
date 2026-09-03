"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, HeartHandshake, Quote } from "lucide-react";
import { BRAND } from "@/lib/config";
import { BentoCard } from "@/components/landing/BentoCard";

const POINTS = [
  {
    icon: GraduationCap,
    title: "Formação e cuidado técnico",
    text: "Atendimento clínico fundamentado, atualizado e ético, sempre respeitando o seu ritmo.",
    accent: "bg-sage-100 text-sage-600",
  },
  {
    icon: ShieldCheck,
    title: "Sigilo em primeiro lugar",
    text: `Tudo o que é dito em sessão permanece entre nós — ${BRAND.crp}.`,
    accent: "bg-mist-100 text-mist-600",
  },
  {
    icon: HeartHandshake,
    title: "Escuta sem julgamentos",
    text: "Um espaço para você se expressar por inteiro, sem máscaras.",
    accent: "bg-dusk-100 text-dusk-500",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function AboutSection() {
  return (
    <section id="sobre" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-xs font-semibold uppercase tracking-widest text-sage-600"
        >
          Sobre mim
        </motion.p>

        {/* Bento grid */}
        <div className="grid auto-rows-auto grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Card destaque — citação */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 p-8 text-white lg:col-span-7 lg:row-span-2"
          >
            {/* Decorações */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5" />

            <Quote className="mb-6 text-white/25" size={52} />
            <p className="relative font-display text-2xl font-semibold leading-snug sm:text-3xl">
              A terapia é um encontro — um lugar para desacelerar, se ouvir e reorganizar aquilo que pesa.
            </p>
            <p className="relative mt-4 text-base font-normal leading-relaxed text-white/70">
              Meu trabalho é acompanhar esse processo com respeito à sua história e ao seu tempo,
              unindo técnica e sensibilidade.
            </p>
            <div className="relative mt-10 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/15" />
              <p className="text-xs text-white/50">{BRAND.name} · {BRAND.crp}</p>
            </div>
          </motion.div>

          {/* Três cards de pilares */}
          {POINTS.map((point, i) => (
            <BentoCard key={point.title} index={i + 1} className="lg:col-span-5">
              <span className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${point.accent}`}>
                <point.icon size={20} />
              </span>
              <h3 className="font-display text-base font-semibold text-ink-800">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/60">{point.text}</p>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
