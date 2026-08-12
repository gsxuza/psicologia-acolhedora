"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
}

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-700/70 hover:bg-sand-200 transition-all duration-200 active:scale-[0.97]",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-dusk-400 px-4 py-2.5 text-sm font-medium text-white hover:bg-dusk-500 transition-all duration-200 active:scale-[0.97]",
};

const MotionButton = motion.button;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, disabled, children, ...props }, ref) => {
    return (
      <MotionButton
        ref={ref}
        className={cn(variants[variant], className)}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        disabled={disabled || loading}
        {...(props as React.ComponentPropsWithoutRef<typeof MotionButton>)}
      >
        {loading ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
            {children}
          </>
        ) : (
          children
        )}
      </MotionButton>
    );
  }
);
Button.displayName = "Button";
