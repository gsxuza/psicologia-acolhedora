<!-- bmad:context -->
<!-- Verified 2026-09-02 against 6ce76e2. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## psicologia-acolhedora

Sistema de gestão de consultório (pacientes, sessões, documentos) para uma psicóloga clínica. Next.js 14 (App Router) + TypeScript + Tailwind, Clerk para autenticação, Neon (Postgres serverless) para dados, deploy na Vercel. `README.md` descreve uma versão anterior baseada em Supabase — desatualizado, ignore-o quanto a auth/storage; o código-fonte é a fonte de verdade.

## Where things are

- Auth e controle de acesso: `middleware.ts` (rotas protegidas) + `lib/config.ts` (e-mail admin único define quem cai no `/dashboard` vs `/portal`)
- Acesso a dados: `lib/db.ts` (client Neon singleton via `sql` tagged template) — nunca instanciar outro client
- Tipos das entidades: `lib/types.ts`, espelham as tabelas em `supabase/schema.sql` (nome da pasta é legado da migração; o schema nela é o real, mesmo rodando em Neon)

## Running and verifying

- `npm install` falha com conflito de peer dependency (`@clerk/nextjs@^7` exige `next@^15+`, projeto usa `next@14.2.35`) — resolvido por um `.npmrc` com `legacy-peer-deps=true` neste commit; se removido, use `npm install --legacy-peer-deps`.

## Known pitfalls

- Variáveis de ambiente na Vercel (ex.: `DATABASE_URL`) precisam do escopo **Preview** marcado, não só **Production** — do contrário, deploys de preview quebram com "no database connection string was provided to `neon()`" mesmo com a variável já cadastrada.

<!-- /bmad:context -->
