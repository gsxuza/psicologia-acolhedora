"use client";

import { motion } from "framer-motion";
import { Brain, Users, CloudRain, Sparkles, Moon, Heart } from "lucide-react";

const SPECIALTIES = [
  { icon: CloudRain, title: "Ansiedade e estresse", text: "Ferramentas para lidar com a mente acelerada e o excesso de preocupação." },
  { icon: Heart, title: "Relacionamentos", text: "Vínculos afetivos, familiares e de casal com mais clareza e comunicação." },
  { icon: Moon, title: "Luto e perdas", text: "Um espaço para elaborar perdas no seu próprio tempo." },
  { icon: Sparkles, title: "Autoestima", text: "Reconstruir a relação consigo mesmo(a) com mais gentileza." },
  { icon: Users, title: "Fase adulta e transições", text: "Mudanças de carreira, rotina e identidade ao longo da vida." },
  { icon: Brain, title: "Regulação emocional", text: "Entender e acolher emoções intensas sem serem dominadas por elas." },
];

export function SpecialtiesSection() {
  return (
    <section id="especialidades" className="bg-white/60 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-3xl font-semibold text-ink-800"
        >
          Especialidades
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALTIES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="card-soft flex gap-4 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dusk-100 text-dusk-500">
                <s.icon size={18} />
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold text-ink-800">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-700/60">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
