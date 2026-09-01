import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ADMIN_EMAIL } from "@/lib/config";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect("/portal");
  }

  return (
    <div className="flex min-h-screen bg-sand-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col pb-16 md:pb-0">
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
