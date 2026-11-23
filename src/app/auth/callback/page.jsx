"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useSession } from "@/app/lib/auth-client";

const VALID_ROLES = ["customer", "vendor"];

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const { data: session, isPending } = useSession();
  const appliedRef = useRef(false);

  useEffect(() => {
    if (isPending || appliedRef.current) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    appliedRef.current = true;

    const finalize = async () => {
      // Persist the account type chosen on the sign-up screen. Sign-in passes
      // no role, so an existing user's role is never overwritten.
      if (VALID_ROLES.includes(roleParam) && roleParam !== session.user.role) {
        try {
          await fetch("/api/user/role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: roleParam }),
          });
        } catch {
          // Ignore: the dashboard still works with the existing role.
        }
      }

      router.replace("/dashboard");
    };

    finalize();
  }, [isPending, session, roleParam, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Loader2 className="size-8 animate-spin text-rose-600" />
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
          <Loader2 className="size-8 animate-spin text-rose-600" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
