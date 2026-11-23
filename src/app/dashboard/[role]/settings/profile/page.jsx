import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { User, Mail, Shield, CalendarDays } from "lucide-react";

export default async function ProfileSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return <div className="p-10 text-center">Please login first</div>;
  }

  const role = user.role?.charAt(0).toUpperCase() + user.role?.slice(1);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>

        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences.
        </p>
      </div>

      {/* Profile Card */}

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>

          <CardDescription>Your personal account details</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">{user.name || "User"}</h2>

              <Badge className="mt-2 capitalize">
                {user.role || "customer"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid gap-5">
            <ProfileItem
              icon={User}
              label="Full Name"
              value={user.name || "Not provided"}
            />

            <ProfileItem icon={Mail} label="Email Address" value={user.email} />

            <ProfileItem icon={Shield} label="Account Role" value={role} />

            <ProfileItem
              icon={CalendarDays}
              label="Account Created"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Not available"
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Future Settings */}

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>

          <CardDescription>Update your account preferences.</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Password change, notification settings, and account actions can be
            added here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-muted p-3">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
