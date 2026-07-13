import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "sage",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "sage" | "mist" | "dusk";
}) {
  const tones = {
    sage: "bg-sage-100 text-sage-600",
    mist: "bg-mist-100 text-mist-600",
    dusk: "bg-dusk-100 text-dusk-500",
  };

  return (
    <div className="card-soft flex items-center gap-4 p-5">
      <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", tones[tone])}>
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-semibold text-ink-800">{value}</p>
        <p className="text-sm text-ink-700/60">{label}</p>
      </div>
    </div>
  );
}
