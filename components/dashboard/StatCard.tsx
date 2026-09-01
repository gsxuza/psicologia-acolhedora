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
      // cubic ease-out
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-variant-numeric tabular-nums">
      {count}
    </span>
  );
}

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
  const tones = {
    sage: "bg-sage-100 text-sage-600",
    mist: "bg-mist-100 text-mist-600",
    dusk: "bg-dusk-100 text-dusk-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card-soft flex items-center gap-4 p-5"
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          tones[tone]
        )}
      >
        {icon}
      </span>
      <div>
        <p className="text-2xl font-semibold text-ink-800">
          {typeof value === "number" ? (
            <CountUp target={value} />
          ) : (
            value
          )}
        </p>
        <p className="text-sm text-ink-700/60">{label}</p>
      </div>
    </motion.div>
  );
}
