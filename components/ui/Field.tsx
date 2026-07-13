import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}

export function FieldWrapper({ label, error, hint, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="label-field">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-700/50">{hint}</p>}
      {error && <p className="mt-1 text-xs text-dusk-500">{error}</p>}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className, ...props }: InputProps) {
  return (
    <FieldWrapper label={label} error={error} hint={hint}>
      <input className={cn("input-field", className)} {...props} />
    </FieldWrapper>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export function Textarea({ label, error, hint, className, ...props }: TextareaProps) {
  return (
    <FieldWrapper label={label} error={error} hint={hint}>
      <textarea className={cn("input-field min-h-[100px] resize-y", className)} {...props} />
    </FieldWrapper>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <FieldWrapper label={label} error={error}>
      <select className={cn("input-field", className)} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
