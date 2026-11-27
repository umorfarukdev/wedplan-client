import { requireRole } from "@/app/lib/session";

export default async function VendorLayout({ children }) {
  await requireRole(["vendor"], "/dashboard/vendor/overview");

  return children;
}
