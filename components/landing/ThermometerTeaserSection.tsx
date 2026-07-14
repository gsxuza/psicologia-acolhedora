"use client";

import { motion } from "framer-motion";
import { EmotionalThermometer } from "@/components/thermometer/EmotionalThermometer";

export function ThermometerTeaserSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-ink-800">
            Termômetro emocional
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-700/70">
            Experimente agora. Pacientes em acompanhamento têm esse mesmo recurso na área
            pessoal, com histórico salvo ao longo do tempo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <EmotionalThermometer />
        </motion.div>
      </div>
    </section>
  );
}
