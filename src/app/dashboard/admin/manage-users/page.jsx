import { Users } from "lucide-react";

export default function ManageUsers() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      <p className="mt-2 text-muted-foreground">
        View, update and control users
      </p>

      <div className="mt-8 rounded-xl border p-10 text-center">
        <Users className="mx-auto h-12 w-12" />

        <p className="mt-4">User management table coming soon</p>
      </div>
    </div>
  );
}
