import ProfileSettings from "@/components/profile/ProfileSettings";
import { requireSession } from "@/app/lib/session";

export default async function ProfilePage() {
  await requireSession("/profile");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <ProfileSettings />
    </div>
  );
}
