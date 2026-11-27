"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";

import { ROLE_HOME, normalizeRole } from "@/lib/roles";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const role = normalizeRole(session.user?.role);
    router.replace(ROLE_HOME[role] || "/dashboard/customer/overview");
  }, [session, isPending, router]);

  return <div className="p-8 text-center">Loading Dashboard...</div>;
}
