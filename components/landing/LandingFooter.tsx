import { Instagram, MessageCircle, Mail } from "lucide-react";
import { BRAND, whatsappLink } from "@/lib/config";
import { BrandMark } from "@/components/landing/LandingHeader";

export function LandingFooter() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <BrandMark size={24} />
          <span className="font-display text-sm font-semibold text-ink-800">
            {BRAND.name}
          </span>
        </div>
        <p className="text-xs text-ink-700/50">{BRAND.role} · {BRAND.crp}</p>

        <div className="flex items-center gap-4">
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm text-ink-700/70 shadow-softer transition-colors hover:text-dusk-500"
          >
            <Instagram size={16} /> {BRAND.instagramHandle}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm text-ink-700/70 shadow-softer transition-colors hover:text-sage-700"
          >
            <MessageCircle size={16} /> {BRAND.whatsappDisplay}
          </a>
          <a
            href={`mailto:${BRAND.email}`}
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm text-ink-700/70 shadow-softer transition-colors hover:text-mist-600"
          >
            <Mail size={16} /> E-mail
          </a>
        </div>

        <p className="text-[11px] text-ink-700/40">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
