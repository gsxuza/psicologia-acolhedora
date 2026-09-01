"use client";

import { motion } from "framer-motion";

// ⚠️ CONTEÚDO DE EXEMPLO — substitua pelos depoimentos reais de pacientes
// (com autorização deles) antes de publicar em produção.
const FEATURED = {
  text: "Substitua este texto pelo depoimento principal de um(a) paciente que autorizou a divulgação.",
  label: "Paciente em acompanhamento",
};

const OTHERS = [
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
    <section id="depoimentos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-xs font-semibold uppercase tracking-widest text-sage-600"
        >
          Depoimentos
        </motion.p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Depoimento destaque */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-between rounded-3xl bg-sage-600 p-8 lg:col-span-2"
          >
            <div>
              <svg
                className="mb-6 text-white/25"
                width="44"
                height="32"
                viewBox="0 0 44 32"
                fill="currentColor"
              >
                <path d="M0 32V19.2C0 13.867 1.333 9.333 4 5.6 6.667 1.867 10.933 0 16.8 0v5.6c-3.2 0-5.467 1.067-6.8 3.2-1.333 2.133-2 4.533-2 7.2H14V32H0Zm22.4 0V19.2c0-5.333 1.333-9.867 4-13.6C29.067 1.867 33.333 0 39.2 0v5.6c-3.2 0-5.467 1.067-6.8 3.2-1.333 2.133-2 4.533-2 7.2H36.4V32H22.4Z" />
              </svg>
              <p className="font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;{FEATURED.text}&rdquo;
              </p>
            </div>
            <p className="mt-8 text-sm font-medium text-white/50">— {FEATURED.label}</p>
          </motion.div>

          {/* Dois depoimentos menores */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            {OTHERS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                className="flex flex-1 flex-col justify-between rounded-3xl border border-sand-200 bg-white p-6"
              >
                <p className="text-sm italic leading-relaxed text-ink-700/65">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 text-xs font-medium text-ink-700/40">— {t.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
