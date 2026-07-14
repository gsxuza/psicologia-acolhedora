"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BRAND, whatsappLink } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl animate-breathe"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-dusk-200/40 blur-3xl animate-breathe"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700">
            {BRAND.crp}
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink-800 sm:text-5xl">
            Cuidar da sua mente com escuta, acolhimento e presença
          </h1>
          <p className="mt-5 max-w-lg text-base text-ink-700/70">
            Sou {BRAND.name}, {BRAND.role.toLowerCase()}. Ofereço um espaço seguro para você
            entender seus sentimentos, atravessar momentos difíceis e construir um caminho
            mais leve — no seu tempo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink("Olá! Gostaria de agendar uma sessão.")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={17} /> Agendar uma sessão
            </a>
            <a href="#sobre" className="btn-secondary">
              Conhecer meu trabalho
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sage-200/60 to-dusk-200/60 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-soft">
            <Image
              src="/gabriela-silva-hero.png"
              alt={`${BRAND.name}, ${BRAND.role}`}
              width={600}
              height={776}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
