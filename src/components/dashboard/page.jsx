"use client";

import { useEffect } from "react";
import { useSession } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      redirect("/sign-in");
      return;
    }

    const role = session.user.role;

    if (role === "admin") {
      redirect("/dashboard/admin");
    } else if (role === "vendor") {
      redirect("/dashboard/vendor");
    } else if (role === "customer") {
      redirect("/dashboard/customer");
    } else {
      redirect("/");
    }
  }, [session, isPending]);

  return <div className="p-8 text-center">Loading Dashboard...</div>;
}
