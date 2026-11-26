"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";

const DASHBOARD_BY_ROLE = {
  admin: "/dashboard/admin",
  vendor: "/dashboard/vendor/overview/overview",
  vendors: "/dashboard/vendor/overview/overview",
  customer: "/dashboard/customer/overview",
  customers: "/dashboard/customer/overview",
};

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const role = session.user?.role || "customer";
    router.replace(DASHBOARD_BY_ROLE[role] || "/dashboard/customer");
  }, [session, isPending, router]);

  return <div className="p-8 text-center">Loading Dashboard...</div>;
}
