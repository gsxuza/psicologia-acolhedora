import { Leaf } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sand-100 px-4">
      {/* Signature: blobs orgânicos "respirando" ao fundo, sutis, evocando calma */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sage-200/50 blur-3xl animate-breathe"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-mist-200/50 blur-3xl animate-breathe"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative w-full max-w-md animate-fadeUp">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100">
            <span className="absolute h-12 w-12 rounded-2xl bg-sage-200 animate-breathe" />
            <Leaf className="relative text-sage-600" size={22} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-800">
            Psicologia Acolhedora
          </h1>
          <p className="mt-1 text-sm text-ink-700/60">
            Um espaço organizado para cuidar de quem cuida.
          </p>
        </div>

        <div className="card-soft p-8">{children}</div>
      </div>
    </div>
  );
}
