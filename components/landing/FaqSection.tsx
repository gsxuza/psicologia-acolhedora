"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ = [
  {
    q: "Como funciona a primeira sessão?",
    a: "É um momento de acolhimento e escuta inicial, onde entendemos juntos o que te trouxe até aqui e como podemos seguir.",
  },
  {
    q: "Atende por convênio?",
    a: "No momento o atendimento é particular. Posso emitir recibo para reembolso, dependendo do seu plano de saúde.",
  },
  {
    q: "As sessões são sigilosas?",
    a: "Sim. Tudo o que é compartilhado em sessão é protegido pelo sigilo profissional, conforme o Código de Ética do Psicólogo.",
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
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Lado esquerdo — título fixo */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sage-600">FAQ</p>
            <h2 className="font-display text-4xl font-semibold leading-tight text-ink-800">
              Perguntas<br />frequentes
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-700/55">
              Ainda tem dúvidas? Entre em contato pelo WhatsApp — respondo com prazer.
            </p>
          </div>

          {/* Acordeão */}
          <div className="divide-y divide-sand-200">
            {FAQ.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <div key={item.q}>
                  <button
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`font-medium transition-colors ${isOpen ? "text-sage-700" : "text-ink-800"}`}>
                      {item.q}
                    </span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-sage-100 text-sage-700" : "bg-sand-200 text-ink-700/50"}`}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm leading-relaxed text-ink-700/60">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
