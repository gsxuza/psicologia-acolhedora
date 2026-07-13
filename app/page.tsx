import Link from "next/link";
import { Leaf, HeartHandshake, ShieldCheck, CalendarClock } from "lucide-react";

// Página pública do site. Antes esta rota simplesmente redirecionava todo
// mundo para /login — agora ela é a home real, aberta a qualquer visitante.
// O login/cadastro passam a ser só a porta de entrada da área de gestão da
// psicóloga (pacientes, sessões, documentos), acessada por um link discreto
// aqui embaixo, não uma barreira na entrada do site.
export default function HomePage() {
  return (
    <div className="min-h-screen bg-sand-100">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100">
            <span className="absolute h-9 w-9 rounded-xl bg-sage-200 animate-breathe" />
            <Leaf className="relative text-sage-600" size={18} />
          </span>
          <span className="font-display text-sm font-semibold text-ink-800">
            Psicologia Acolhedora
          </span>
        </div>

        <Link
          href="/login"
          className="text-sm font-medium text-ink-700/60 transition-colors hover:text-sage-700"
        >
          Área da psicóloga
        </Link>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-20 text-center sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl animate-breathe"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-mist-200/40 blur-3xl animate-breathe"
            style={{ animationDelay: "2s" }}
          />

          <div className="relative mx-auto max-w-2xl animate-fadeUp">
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink-800 sm:text-4xl">
              Um espaço seguro para cuidar da sua saúde emocional
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-ink-700/70">
              Atendimento psicológico acolhedor, online e presencial, com
              privacidade e cuidado em cada detalhe do processo terapêutico.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#contato" className="btn-primary">
                Agendar uma conversa inicial
              </a>
              <a href="#sobre" className="btn-secondary">
                Conhecer a abordagem
              </a>
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="card-soft p-6 text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-600">
                <HeartHandshake size={20} />
              </span>
              <h3 className="font-display text-base font-semibold text-ink-800">
                Escuta acolhedora
              </h3>
              <p className="mt-1.5 text-sm text-ink-700/65">
                Cada sessão é conduzida no seu ritmo, sem julgamentos.
              </p>
            </div>
            <div className="card-soft p-6 text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-mist-100 text-mist-600">
                <ShieldCheck size={20} />
              </span>
              <h3 className="font-display text-base font-semibold text-ink-800">
                Sigilo e privacidade
              </h3>
              <p className="mt-1.5 text-sm text-ink-700/65">
                Suas informações são tratadas com total confidencialidade.
              </p>
            </div>
            <div className="card-soft p-6 text-center">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-dusk-100 text-dusk-500">
                <CalendarClock size={20} />
              </span>
              <h3 className="font-display text-base font-semibold text-ink-800">
                Flexibilidade
              </h3>
              <p className="mt-1.5 text-sm text-ink-700/65">
                Sessões online ou presenciais, no horário que couber na sua rotina.
              </p>
            </div>
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-2xl px-6 pb-24 text-center">
          <div className="card-soft p-8">
            <h2 className="font-display text-xl font-semibold text-ink-800">
              Vamos conversar?
            </h2>
            <p className="mt-2 text-sm text-ink-700/65">
              Entre em contato para agendar sua primeira sessão ou tirar dúvidas
              sobre o acompanhamento.
            </p>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 inline-flex"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-sand-200 px-6 py-6 text-center text-xs text-ink-700/45">
        © {new Date().getFullYear()} Psicologia Acolhedora ·{" "}
        <Link href="/login" className="hover:text-sage-600 hover:underline">
          Área da psicóloga
        </Link>
      </footer>
    </div>
  );
}
