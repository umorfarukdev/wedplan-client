import { requireRole } from "@/app/lib/session";

export default async function CustomerLayout({ children }) {
  await requireRole(["customer"], "/dashboard/customer/overview");

  return children;
}
