"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(
        error.message.includes("already registered")
          ? "Este e-mail já está cadastrado."
          : "Não foi possível criar sua conta. Tente novamente."
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center">
        <h2 className="font-display text-lg font-semibold text-ink-800">
          Confirme seu e-mail
        </h2>
        <p className="mt-2 text-sm text-ink-700/60">
          Enviamos um link de confirmação para <strong>{email}</strong>. Assim que
          confirmar, você já pode entrar na plataforma.
        </p>
        <Link href="/login" className="btn-primary mt-6 inline-flex">
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome completo"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Seu nome"
      />
      <Input
        label="E-mail"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="voce@exemplo.com"
      />
      <Input
        label="Senha"
        type="password"
        autoComplete="new-password"
        required
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mínimo 6 caracteres"
      />

      {error && (
        <p className="rounded-lg bg-dusk-50 px-3 py-2 text-sm text-dusk-600">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="mt-2 w-full">
        {loading ? "Criando conta..." : "Criar conta"}
      </Button>

      <p className="mt-2 text-center text-sm text-ink-700/60">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-sage-600 hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
