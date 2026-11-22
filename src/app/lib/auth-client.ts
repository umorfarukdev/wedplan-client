import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /**
   * The base URL of the auth server. Optional when the auth API is served
   * from the same origin (which it is here, via /api/auth).
   */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
