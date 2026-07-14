import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { ADMIN_EMAIL } from "@/lib/config";

// Segunda camada de proteção (além do middleware): garante que nenhum
// Server Component do painel renderize dados sem uma sessão válida — e que
// só a conta da psicóloga (ADMIN_EMAIL) acesse esta área de gestão.
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

  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect("/portal");
  }

  return (
    <div className="flex min-h-screen bg-sand-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
