import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";

/**
 * Build request headers that authenticate against the Express API.
 *
 * The Express server verifies the better-auth session token, so every
 * private call from a server action or server component forwards it as a
 * Bearer token.
 */
export async function getAuthHeaders(extra = {}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const token = session?.session?.token;

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}
