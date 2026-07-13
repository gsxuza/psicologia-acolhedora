import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    const variants = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost:
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-700/70 hover:bg-sand-200 transition-colors",
      danger:
        "inline-flex items-center justify-center gap-2 rounded-xl bg-dusk-400 px-4 py-2.5 text-sm font-medium text-white hover:bg-dusk-500 transition-colors",
    };

    return (
      <button ref={ref} className={cn(variants[variant], className)} {...props} />
    );
  }
);
Button.displayName = "Button";
