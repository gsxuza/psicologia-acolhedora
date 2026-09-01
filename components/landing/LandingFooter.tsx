import { Instagram, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { BRAND, whatsappLink } from "@/lib/config";
import { BrandMark } from "@/components/landing/LandingHeader";

export function LandingFooter() {
  return (
    <footer className="border-t border-sand-200 bg-ink-900 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-white/10 p-1.5">
                <BrandMark size={28} />
              </div>
              <span className="font-display text-base font-semibold text-white">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-3 text-sm text-white/40">
              {BRAND.role} · {BRAND.crp}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/40">
              Atendimento psicológico acolhedor, online e presencial. Um espaço seguro para cuidar da sua saúde mental.
            </p>
          </div>

          {/* Links de contato */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/30">
              Contato
            </p>
            <div className="flex flex-col gap-3">
              <FooterLink
                href={BRAND.instagramUrl}
                icon={<Instagram size={15} />}
                label={BRAND.instagramHandle}
                external
              />
              <FooterLink
                href={whatsappLink()}
                icon={<MessageCircle size={15} />}
                label={BRAND.whatsappDisplay}
                external
              />
              <FooterLink
                href={`mailto:${BRAND.email}`}
                icon={<Mail size={15} />}
                label="E-mail"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-sage-600 p-6">
            <p className="font-display text-lg font-semibold text-white">
              Pronta para começar?
            </p>
            <p className="mt-1 text-sm text-white/70">
              Agende sua primeira sessão agora.
            </p>
            <a
              href={whatsappLink("Olá! Gostaria de agendar uma sessão.")}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sage-700 transition-opacity hover:opacity-90"
            >
              <MessageCircle size={15} />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-white/25">
          © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-2.5 text-sm text-white/50 transition-colors hover:text-white"
    >
      {icon}
      {label}
      {external && (
        <ArrowUpRight
          size={12}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </a>
  );
}
