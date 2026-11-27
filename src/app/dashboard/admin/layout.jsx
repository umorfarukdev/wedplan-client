import { requireRole } from "@/app/lib/session";

export default async function AdminLayout({ children }) {
  await requireRole(["admin"], "/dashboard/admin/overview");

  return children;
}
