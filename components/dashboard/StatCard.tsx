"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [count, setCount] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    if (target === 0) { setCount(0); return; }
    const duration = 700;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{count}</span>;
}

const toneConfig = {
  sage: {
    icon: "bg-sage-100 text-sage-600",
    bar: "bg-sage-500",
  },
  mist: {
    icon: "bg-mist-100 text-mist-600",
    bar: "bg-mist-500",
  },
  dusk: {
    icon: "bg-dusk-100 text-dusk-500",
    bar: "bg-dusk-400",
  },
};

export function StatCard({
  label,
  value,
  icon,
  tone = "sage",
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  tone?: "sage" | "mist" | "dusk";
}) {
  const config = toneConfig[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-4 sm:p-5"
    >
      {/* Barra decorativa no topo */}
      <div className={cn("absolute inset-x-0 top-0 h-0.5", config.bar)} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ink-700/50">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-ink-800 sm:text-3xl">
            {typeof value === "number" ? <CountUp target={value} /> : value}
          </p>
        </div>
        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10", config.icon)}>
          {icon}
        </span>
      </div>
    </motion.div>
  );
}
