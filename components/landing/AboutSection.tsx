"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, HeartHandshake } from "lucide-react";
import { BRAND } from "@/lib/config";

const POINTS = [
  {
    icon: GraduationCap,
    title: "Formação e cuidado técnico",
    text: "Atendimento clínico fundamentado, atualizado e ético, sempre respeitando o seu ritmo.",
  },
  {
    icon: ShieldCheck,
    title: "Sigilo em primeiro lugar",
    text: `Tudo o que é dito em sessão permanece entre nós — ${BRAND.crp}.`,
  },
  {
    icon: HeartHandshake,
    title: "Escuta sem julgamentos",
    text: "Um espaço para você se expressar por inteiro, sem máscaras.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-ink-800">Sobre mim</h2>
        <p className="mt-4 text-ink-700/70">
          Acredito que a terapia é um encontro — um lugar onde você pode desacelerar,
          se ouvir e reorganizar aquilo que pesa. Meu trabalho é acompanhar esse processo
          com respeito à sua história e ao seu tempo, unindo técnica e sensibilidade.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {POINTS.map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="card-soft p-6 text-center"
          >
            <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
              <point.icon size={20} />
            </span>
            <h3 className="font-display text-base font-semibold text-ink-800">{point.title}</h3>
            <p className="mt-1.5 text-sm text-ink-700/65">{point.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
