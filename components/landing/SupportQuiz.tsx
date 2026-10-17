"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, MessageCircle, RotateCcw } from "lucide-react";
import { whatsappLink } from "@/lib/config";

type Step = {
  question: string;
  options: string[];
};

const STEPS: Step[] = [
  {
    question: "O que mais pesa pra você agora?",
    options: [
      "Ansiedade e estresse",
      "Relacionamentos",
      "Autoestima",
      "Luto e perdas",
      "Transições de vida",
    ],
  },
  {
    question: "Você prefere sessões online ou presenciais?",
    options: ["Online", "Presencial", "Tanto faz"],
  },
  {
    question: "Com que frequência você imagina as sessões?",
    options: ["Semanal", "Quinzenal", "Ainda não sei"],
  },
];

const RESULT_TEXT: Record<string, string> = {
  "Ansiedade e estresse":
    "Dá pra construir, juntas, ferramentas pra lidar com a mente acelerada e recuperar um pouco de calma no dia a dia.",
  Relacionamentos:
    "Vínculos afetivos, familiares ou de casal podem ganhar mais clareza e comunicação com o apoio certo.",
  Autoestima:
    "Reconstruir a relação com você mesmo, com mais gentileza, é um processo — e pode começar com uma conversa.",
  "Luto e perdas":
    "Elaborar uma perda no seu próprio tempo, com um espaço seguro de verdade, faz diferença.",
  "Transições de vida":
    "Mudanças de carreira, rotina ou identidade pedem apoio — não precisa atravessar isso sozinho(a).",
};

export function SupportQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const isDone = stepIndex >= STEPS.length;
  const current = STEPS[stepIndex];

  function handleSelect(option: string) {
    const next = [...answers];
    next[stepIndex] = option;
    setAnswers(next);
    setStepIndex((i) => i + 1);
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleRestart() {
    setAnswers([]);
    setStepIndex(0);
  }

  const topic = answers[0] ?? "";
  const modality = answers[1] ?? "";
  const frequency = answers[2] ?? "";

  const message = `Olá! Fiz o teste rápido do site e gostaria de conversar sobre: ${topic}. Modalidade: ${modality}. Frequência que imagino: ${frequency}.`;

  return (
    <section id="quiz" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sage-600">
            Não sabe por onde começar?
          </p>
          <h2 className="font-display text-3xl font-bold tracking-wide text-ink-800">
            Responda 3 perguntas rápidas
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-700/70">
            Sem compromisso — é só pra te ajudar a organizar o que você está sentindo antes de conversar comigo.
          </p>
        </div>

        <div className="card-soft mt-8 overflow-hidden p-6 sm:p-8">
          {!isDone && (
            <div className="mb-6 flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= stepIndex ? "bg-sage-500" : "bg-sand-200"
                  }`}
                />
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-display text-lg font-semibold text-ink-800">
                  {current.question}
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {current.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className="flex items-center justify-between rounded-xl border border-sand-200 bg-white px-4 py-3 text-left text-sm font-medium text-ink-800 transition-all hover:border-sage-300 hover:bg-sage-50"
                    >
                      {option}
                      <ArrowRight size={14} className="text-ink-700/30" />
                    </button>
                  ))}
                </div>
                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-ink-700/50 transition-colors hover:text-ink-800"
                  >
                    <ArrowLeft size={12} /> Voltar
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-sage-600">
                  {topic}
                </p>
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink-800">
                  {RESULT_TEXT[topic] ?? "Vamos conversar sobre o que você está sentindo."}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-sage-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sage-700"
                  >
                    <MessageCircle size={16} />
                    Conversar sobre isso
                  </a>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-700/60 transition-colors hover:text-ink-800"
                  >
                    <RotateCcw size={13} /> Refazer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
