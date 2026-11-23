import { NextResponse } from "next/server";

import { auth } from "@/app/lib/auth";

const VALID_ROLES = ["customer", "vendor"];

/**
 * Persist the account type a user picked during social sign-in.
 * Requires an authenticated better-auth session.
 */
export async function POST(request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const role = String(body?.role || "").toLowerCase();

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await auth.api.updateUser({
    body: { role },
    headers: request.headers,
  });

  return NextResponse.json({ ok: true, role });
}
