"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function PortalSignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-1.5 text-ink-700/60 transition-colors hover:text-dusk-500"
      title="Sair"
    >
      <LogOut size={15} /> Sair
    </button>
  );
}
