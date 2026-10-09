import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdminAuthenticated } from "@/lib/service-catalog/auth";
import { readServiceCatalog } from "@/lib/service-catalog/server";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  const initialCatalog = await readServiceCatalog();
  return (
    <div className="min-h-screen bg-soft-gray">
      <AdminDashboard key={initialCatalog.updatedAt} initialCatalog={initialCatalog} />
    </div>
  );
}
