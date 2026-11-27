import { notFound, redirect } from "next/navigation";

import ProfileSettings from "@/components/profile/ProfileSettings";
import { requireSession } from "@/app/lib/session";
import { normalizeRole } from "@/lib/roles";

const VALID_ROLES = ["admin", "vendor", "customer"];

export default async function ProfileSettingsPage({ params }) {
  const { role } = await params;

  if (!VALID_ROLES.includes(role)) {
    notFound();
  }

  const path = `/dashboard/${role}/settings/profile`;
  const session = await requireSession(path);
  const actualRole = normalizeRole(session.user?.role);

  if (actualRole !== role) {
    redirect(`/dashboard/${actualRole}/settings/profile`);
  }

  return <ProfileSettings />;
}
