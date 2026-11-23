import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const users = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    role: "customer",
    status: "active",
  },
  {
    name: "Wedding Studio",
    email: "vendor@gmail.com",
    role: "vendor",
    status: "active",
  },
];

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                <div>
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div className="flex gap-3">
                  <Badge>{user.role}</Badge>

                  <Button size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
