import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso em Client Components ("use client").
 * Usa a anon key pública — a segurança real dos dados vem das
 * políticas de Row Level Security (RLS) definidas em supabase/schema.sql,
 * não deste cliente.
 *
 * O fallback abaixo existe só para não quebrar o build/prerender quando as
 * variáveis de ambiente ainda não foram configuradas na Vercel — a app não
 * funciona de verdade até NEXT_PUBLIC_SUPABASE_URL e
 * NEXT_PUBLIC_SUPABASE_ANON_KEY serem definidas com os valores reais do
 * projeto Supabase.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"
  );
}
