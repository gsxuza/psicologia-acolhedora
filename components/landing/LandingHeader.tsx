"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        scrolled
          ? "border-b border-sand-200/80 bg-sand-100/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-base font-semibold text-ink-800">
            Gabriela<span className="font-normal text-sage-600">Silva</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-700/55 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink-800"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-sand-300 bg-white px-5 py-2 text-sm font-medium text-ink-800 shadow-sm transition-all hover:border-sage-300 hover:shadow-md sm:inline-flex"
          >
            Entrar
          </Link>
          <button
            className="rounded-xl p-2 text-ink-700/60 hover:bg-sand-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-sand-200 bg-sand-100 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4 text-sm font-medium text-ink-700/70">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="rounded-xl px-3 py-2.5 transition-colors hover:bg-sand-200 hover:text-ink-800"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV.length * 0.05, duration: 0.2 }}
                className="mt-2 pt-2 border-t border-sand-200"
              >
                <Link
                  href="/login"
                  className="block rounded-xl bg-sage-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Entrar
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" className="text-sage-600" strokeWidth="1.3" opacity="0.85">
        <line x1="8" y1="14" x2="16" y2="9" />
        <line x1="16" y1="9" x2="24" y2="11" />
        <line x1="24" y1="11" x2="31" y2="16" />
        <line x1="8" y1="14" x2="10" y2="23" />
        <line x1="10" y1="23" x2="16" y2="9" />
        <line x1="10" y1="23" x2="18" y2="28" />
        <line x1="18" y1="28" x2="24" y2="11" />
        <line x1="24" y1="11" x2="27" y2="24" />
        <line x1="27" y1="24" x2="31" y2="16" />
        <line x1="18" y1="28" x2="27" y2="24" />
      </g>
      <g className="fill-sage-600">
        <circle cx="8" cy="14" r="2.2" />
        <circle cx="16" cy="9" r="2" />
        <circle cx="24" cy="11" r="2.4" />
        <circle cx="31" cy="16" r="2" />
        <circle cx="10" cy="23" r="2.2" />
        <circle cx="18" cy="28" r="2.6" />
        <circle cx="27" cy="24" r="2" />
      </g>
    </svg>
  );
}
