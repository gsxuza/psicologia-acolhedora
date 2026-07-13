import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";

// Segunda camada de proteção (além do middleware): garante que nenhum
// Server Component do painel renderize dados sem uma sessão válida.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-sand-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
