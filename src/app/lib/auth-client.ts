import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /**
   * The base URL of the auth server. Optional when the auth API is served
   * from the same origin (which it is here, via /api/auth).
   */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
