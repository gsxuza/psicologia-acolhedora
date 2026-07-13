# Psicologia Acolhedora

Sistema de gestão de consultório (pacientes, sessões, documentos) migrado do
Base44 (no-code) para **Next.js 14 (App Router) + Supabase**, pronto para deploy
na Vercel.

## O que mudou em relação ao Base44

| Aspecto | Base44 (antes) | Agora |
|---|---|---|
| Front-end | Gerado pela plataforma no-code | Next.js 14 + TypeScript + Tailwind, componentizado |
| Dados | Entidades gerenciadas pelo Base44 | Postgres no Supabase, schema em `supabase/schema.sql` |
| Autenticação | Login embutido do Base44 | Supabase Auth (e-mail/senha), sessão em JWT via cookies httpOnly |
| Controle de acesso | Regras internas da plataforma | Row Level Security (RLS) no Postgres + middleware de rotas protegidas |
| Arquivos | Upload interno do Base44 | Supabase Storage (bucket `documents`) |
| Deploy | Ambiente do Base44 | Vercel (build 100% Next.js padrão) |

As entidades **Patient**, **Session**, **Document** e **User** foram extraídas
diretamente do app original no Base44 (via `list_entity_schemas`) e viraram as
tabelas `patients`, `sessions`, `documents` e `profiles` em
`supabase/schema.sql`, campo a campo — nenhuma informação de negócio foi
perdida na migração.

> **Nota sobre a extração do código-fonte:** o acesso direto aos arquivos do
> app (sandbox de código) no Base44 exige o plano Builder ou superior; sua
> conta está no plano gratuito, então o Base44 bloqueou a leitura de arquivo-a-
> arquivo. Por isso a reestruturação abaixo foi reconstruída do zero seguindo
> fielmente o modelo de dados real do seu app e o mesmo padrão de arquitetura
> que você já usou na migração do Solo Desk (Vercel + Supabase + RLS + RPCs).
> Se quiser comparar linha a linha com o código original, exporte o projeto
> pelo próprio painel do Base44 (Configurações do app → Exportar/GitHub) e eu
> reconcilio qualquer tela ou fluxo que tenha ficado diferente.

## Estrutura do projeto

```
app/
  (auth)/login, (auth)/registro      → páginas públicas de autenticação
  (dashboard)/dashboard              → painel com métricas e próximas sessões
  (dashboard)/pacientes              → lista, cadastro, edição e ficha do paciente
  (dashboard)/sessoes                → agenda de sessões
  (dashboard)/documentos             → biblioteca de documentos
  auth/callback                      → troca de código de confirmação de e-mail
components/
  ui/        → Button, Badge, Input/Select/Textarea (primitivos reutilizáveis)
  layout/    → Sidebar, Header
  patients/  → PatientCard, PatientForm
  sessions/  → SessionForm, SessionRow, SessionsBoard
  documents/ → DocumentCard, DocumentUploadForm
  dashboard/ → StatCard, UpcomingSessions
lib/
  supabase/  → client.ts (browser), server.ts (Server Components), middleware.ts
  types.ts   → tipos espelhando as entidades do Base44
middleware.ts → protege /dashboard, /pacientes, /sessoes, /documentos
supabase/
  schema.sql  → tabelas + RLS
  storage.sql → bucket de documentos + políticas
```

## Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode `supabase/schema.sql` e depois `supabase/storage.sql`.
3. Em **Authentication → Providers**, deixe **Email** habilitado (é o único
   usado aqui). Em **Authentication → URL Configuration**, adicione a URL do
   seu domínio Vercel em *Redirect URLs* (ex.: `https://seu-app.vercel.app/auth/callback`).
4. Em **Project Settings → API**, copie `Project URL` e `anon public key`.

## Rodar localmente

```bash
cp .env.example .env.local   # preencha com as credenciais do Supabase
npm install
npm run dev
```

## Deploy na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório — a
   Vercel detecta Next.js automaticamente, sem configuração extra.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Não há passos manuais adicionais — `next build` já foi validado
   localmente sem erros (ver abaixo).

## Sobre autenticação e segurança

- **Supabase Auth** foi escolhido em vez de NextAuth/Auth.js porque, como o
  banco de dados também é o Supabase, a sessão (JWT) e as políticas de RLS
  compartilham a mesma identidade (`auth.uid()`) nativamente — é o mesmo
  padrão que você já validou no Solo Desk. Se preferir usar NextAuth.js no
  futuro (por exemplo, para login social com múltiplos provedores), dá para
  trocar apenas a camada de `lib/supabase/*` mantendo o resto do app.
- Toda rota sob `/dashboard`, `/pacientes`, `/sessoes` e `/documentos` é
  verificada duas vezes: no `middleware.ts` (antes de renderizar) e de novo no
  layout do grupo de rotas (`app/(dashboard)/layout.tsx`), então nenhuma
  página vaza para quem não está autenticado.
- Nenhuma linha de código confia em `user_id` vindo do cliente — todo filtro de
  dados (`created_by = auth.uid()`) é reforçado pelo Postgres via RLS, não pelo
  front-end.

## Build verificado

`npm run build` foi executado neste ambiente e concluiu com sucesso (12/12
páginas geradas, sem erros de tipo ou de webpack). O único obstáculo encontrado
durante a verificação foi a falta de acesso à internet do *meu* sandbox para
baixar as fontes do Google Fonts — isso não acontece na Vercel nem no seu
ambiente local, que têm acesso normal à internet.
