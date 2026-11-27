"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Eye,
  ShieldCheck,
  ShieldX,
  MailCheck,
  MailX,
  Ban,
  Unlock,
} from "lucide-react";
import { blockUser, unblockUser } from "@/lib/actions/auth-user";
import { useRouter } from "next/navigation";

export default function UsersClient({ initialUsers = [] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(null);

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700",

      vendor: "bg-blue-100 text-blue-700",

      customer: "bg-green-100 text-green-700",
    };

    return <Badge className={`capitalize ${styles[role]}`}>{role}</Badge>;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  async function handleBlock(user) {
    try {
      const userId = user._id || user.id;

      setLoading(userId);

      await blockUser(userId);

      setUsers((prev) =>
        prev.map((item) =>
          (item._id || item.id) === userId
            ? {
                ...item,
                banned: true,
              }
            : item,
        ),
      );

      toast.success("User blocked");

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(null);
    }
  }

  async function handleUnblock(user) {
    try {
      const userId = user._id || user.id;

      setLoading(userId);

      await unblockUser(userId);

      setUsers((prev) =>
        prev.map((item) =>
          (item._id || item.id) === userId
            ? {
                ...item,
                banned: false,
              }
            : item,
        ),
      );

      toast.success("User unblocked");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>

        <p className="text-muted-foreground">
          Manage customers, vendors and admins
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Users</CardTitle>

            <Badge>{users.length} Users</Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>

                  <TableHead>Role</TableHead>

                  <TableHead>Plan</TableHead>

                  <TableHead>Email</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Joined</TableHead>

                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{user.name}</p>

                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>{getRoleBadge(user.role)}</TableCell>

                    <TableCell>
                      <Badge variant="outline">{user.subscriptionPlan}</Badge>
                    </TableCell>

                    <TableCell>
                      {user.emailVerified ? (
                        <Badge className="bg-green-100 text-green-700">
                          <MailCheck className="mr-1 h-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <MailX className="mr-1 h-3" />
                          Unverified
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {user.banned ? (
                        <Badge className="bg-red-100 text-red-700">
                          <ShieldX className="mr-1 h-3" />
                          Blocked
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700">
                          <ShieldCheck className="mr-1 h-3" />
                          Active
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>{formatDate(user.createdAt)}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="mr-1 h-4" />
                          View
                        </Button>

                        {user.banned ? (
                          <Button
                            size="icon"
                            variant="outline"
                            disabled={loading === (user._id || user.id)}
                            onClick={() => handleUnblock(user)}
                          >
                            <Unlock className="h-4 text-green-600" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            variant="outline"
                            disabled={loading === (user._id || user.id)}
                            onClick={() => handleBlock(user)}
                          >
                            <Ban className="h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>User Details</CardTitle>

            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              Close
            </Button>
          </CardHeader>

          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Name</p>

              <p className="font-bold">{selectedUser.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Email</p>

              <p className="font-bold">{selectedUser.email}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Role</p>

              {getRoleBadge(selectedUser.role)}
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>

              <p>{selectedUser.banned ? "Blocked" : "Active"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
