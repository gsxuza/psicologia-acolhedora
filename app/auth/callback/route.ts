import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Troca o código de confirmação de e-mail por uma sessão válida
// (usado no link enviado após o cadastro).
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
