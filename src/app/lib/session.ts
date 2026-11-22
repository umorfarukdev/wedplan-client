import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/app/lib/auth";
import { ROLE_HOME, normalizeRole } from "@/lib/roles";

/**
 * Read the current better-auth session on the server.
 */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Require an authenticated user. Redirects to sign in when missing and
 * remembers where the user was trying to go.
 */
export async function requireSession(redirectTo = "/dashboard") {
  const session = await getSession();

  if (!session?.user) {
    redirect(`/sign-in?redirect=${encodeURIComponent(redirectTo)}`);
  }

  return session;
}

/**
 * Require one of the allowed roles. Authenticated users with a different
 * role are sent to their own dashboard instead of seeing a dead end.
 */
export async function requireRole(allowedRoles, redirectTo = "/dashboard") {
  const session = await requireSession(redirectTo);
  const role = normalizeRole(session.user.role);
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!allowed.includes(role)) {
    redirect(ROLE_HOME[role] || "/dashboard");
  }

  return session;
}
