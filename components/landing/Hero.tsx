"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { BRAND, whatsappLink } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-12 sm:pt-20">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[700px] w-[700px] translate-x-1/3 -translate-y-1/4 rounded-full bg-sage-100/70 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-dusk-100/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Badge animado */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-sage-200/80 bg-white/80 px-4 py-2 text-xs font-medium text-sage-700 shadow-sm backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
          </span>
          Disponível para novos pacientes · Sessões online e presenciais
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_360px]">
          {/* Bloco de texto */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-ink-800 sm:text-6xl lg:text-[5rem]"
            >
              Um espaço para{" "}
              <em className="not-italic text-sage-600">cuidar de você</em>
              {" "}com escuta e presença
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-700/60"
            >
              Sou {BRAND.name}, {BRAND.role.toLowerCase()} ({BRAND.crp}). Ofereço um espaço
              seguro para atravessar momentos difíceis e construir um caminho mais leve — no
              seu tempo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={whatsappLink("Olá! Gostaria de agendar uma sessão.")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-sage-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sage-600/25 transition-all hover:-translate-y-0.5 hover:bg-sage-700 hover:shadow-xl hover:shadow-sage-600/30"
              >
                <MessageCircle size={16} />
                Agendar sessão
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#sobre"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-700/60 transition-colors hover:text-ink-800"
              >
                Conhecer meu trabalho
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 flex flex-wrap items-center gap-8 border-t border-sand-200 pt-8"
            >
              <HeroStat number="5+" label="anos de experiência" />
              <HeroStat number="200+" label="pacientes atendidos" />
              <HeroStat number="100%" label="sigilo garantido" />
            </motion.div>
          </div>

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xs lg:max-w-none lg:self-end"
          >
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-sage-200/50 to-dusk-200/40 blur-xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-white shadow-2xl shadow-ink-900/10">
              <Image
                src="/gabriela-silva-hero.png"
                alt={`${BRAND.name}, ${BRAND.role}`}
                width={600}
                height={776}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Floating card com CRP */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              className="absolute -bottom-5 -left-5 rounded-2xl border border-sand-200 bg-white px-4 py-3 shadow-lg"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-ink-700/40">Psicóloga Clínica</p>
              <p className="font-display text-sm font-semibold text-ink-800">{BRAND.crp}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-ink-800">{number}</p>
      <p className="text-xs text-ink-700/45">{label}</p>
    </div>
  );
}
