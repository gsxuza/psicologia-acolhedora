"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/landing/BentoCard";

// Depoimentos reais de pacientes que autorizaram a divulgação.
// Lista vazia por padrão: a seção não inventa citações — veja renderização abaixo.
const TESTIMONIALS: { text: string; label: string }[] = [];

export function TestimonialsSection() {
  const [featured, ...others] = TESTIMONIALS;

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

        {featured ? (
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
                  &ldquo;{featured.text}&rdquo;
                </p>
              </div>
              <p className="mt-8 text-sm font-medium text-white/50">— {featured.label}</p>
            </motion.div>

            {/* Depoimentos menores */}
            <div className="flex flex-col gap-4 lg:col-span-1">
              {others.map((t, i) => (
                <BentoCard key={t.text} index={i} className="flex-1 justify-between">
                  <p className="text-sm italic leading-relaxed text-ink-700/65">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="mt-4 text-xs font-medium text-ink-700/40">— {t.label}</p>
                </BentoCard>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-sand-300 bg-white/60 px-8 py-14 text-center">
            <p className="text-sm text-ink-700/55">
              Os primeiros depoimentos estão a caminho — publicados assim que os pacientes
              autorizarem a divulgação.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
