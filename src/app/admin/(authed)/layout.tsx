import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import { AdminNav } from "../_components/admin-nav";
import { AdminRoleProvider } from "../_components/admin-role-context";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminRoleProvider role={session.role}>
      <div className="min-h-screen bg-background flex">
        <AdminNav
          user={{ email: session.email, role: session.role }}
        />
        <main className="flex-1 lg:ml-64 min-w-0">
          <div className="p-6 lg:p-8 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </AdminRoleProvider>
  );
}
