"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// ⚠️ CONTEÚDO DE EXEMPLO — substitua pelos depoimentos reais de pacientes
// (com autorização deles) antes de publicar. Não usar nomes/citações
// inventados atribuídos a pessoas reais.
const TESTIMONIALS = [
  {
    text: "Substitua este texto pelo depoimento real de um(a) paciente que autorizou a divulgação.",
    label: "Paciente em acompanhamento",
  },
  {
    text: "Substitua este texto pelo depoimento real de um(a) paciente que autorizou a divulgação.",
    label: "Paciente em acompanhamento",
  },
  {
    text: "Substitua este texto pelo depoimento real de um(a) paciente que autorizou a divulgação.",
    label: "Paciente em acompanhamento",
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-3xl font-semibold text-ink-800"
        >
          Depoimentos
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-soft p-6"
            >
              <Quote className="mb-3 text-dusk-300" size={22} />
              <p className="text-sm italic text-ink-700/70">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-xs font-medium text-ink-700/50">— {t.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
