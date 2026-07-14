"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ = [
  {
    q: "Como funciona a primeira sessão?",
    a: "É um momento de acolhimento e escuta inicial, onde entendemos juntos o que te trouxe até aqui e como podemos seguir.",
  },
  {
    q: "As sessões são sigilosas?",
    a: "Sim. Tudo o que é compartilhado em sessão é protegido pelo sigilo profissional, conforme o Código de Ética do Psicólogo.",
  },
  {
    q: "Atende por convênio?",
    a: "No momento o atendimento é particular. Posso emitir recibo para reembolso, dependendo do seu plano de saúde.",
  },
  {
    q: "Qual a duração e frequência das sessões?",
    a: "As sessões duram 50 minutos, geralmente semanais. A frequência pode ser ajustada conforme sua necessidade ao longo do processo.",
  },
  {
    q: "O atendimento é online ou presencial?",
    a: "Ofereço as duas modalidades, para se adaptar melhor à sua rotina.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white/60 px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-3xl font-semibold text-ink-800">
          Perguntas frequentes
        </h2>

        <div className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="card-soft overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium text-ink-800">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-ink-700/50" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-sm text-ink-700/65">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
