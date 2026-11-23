
"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
} from "lucide-react";

const users = [
  {
    _id: "6b0434a82fca6ed342e97a6c",
    name: "Umar Faruk Ridoy",
    email: "umorfarukridoy111@gmail.com",
    emailVerified: false,
    createdAt: "2026-11-23T12:42:16.276Z",
    role: "admin",
    isBlocked: false,
    subscriptionPlan: "free",
  },
];

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700",
      vendor: "bg-blue-100 text-blue-700",
      customer: "bg-green-100 text-green-700",
    };

    return (
      <Badge
        className={`capitalize ${styles[role] || "bg-gray-100 text-gray-700"}`}
      >
        {role}
      </Badge>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage all registered customers, vendors, and administrators.
        </p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users</CardTitle>

            <Badge variant="secondary">
              {users.length} Users
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Email Verified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    {/* User */}
                    <TableCell>
                      <div>
                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>

                    {/* Subscription */}
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.subscriptionPlan}
                      </Badge>
                    </TableCell>

                    {/* Email Verification */}
                    <TableCell>
                      {user.emailVerified ? (
                        <Badge className="gap-1 bg-green-100 text-green-700">
                          <MailCheck className="size-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="gap-1 bg-amber-100 text-amber-700">
                          <MailX className="size-3" />
                          Unverified
                        </Badge>
                      )}
                    </TableCell>

                    {/* Account Status */}
                    <TableCell>
                      {user.isBlocked ? (
                        <Badge className="gap-1 bg-red-100 text-red-700">
                          <ShieldX className="size-3" />
                          Blocked
                        </Badge>
                      ) : (
                        <Badge className="gap-1 bg-green-100 text-green-700">
                          <ShieldCheck className="size-3" />
                          Active
                        </Badge>
                      )}
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="mr-2 size-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {users.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Selected User Details */}
      {selectedUser && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Details</CardTitle>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </Button>
          </CardHeader>

          <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-semibold">{selectedUser.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-semibold">{selectedUser.email}</p>
            </div>

            <div>
              <p className="text-muted-foreground">User ID</p>
              <p className="break-all font-semibold">
                {selectedUser._id}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Role</p>
              {getRoleBadge(selectedUser.role)}
            </div>

            <div>
              <p className="text-muted-foreground">Subscription</p>
              <p className="font-semibold capitalize">
                {selectedUser.subscriptionPlan}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Account Status</p>
              <p className="font-semibold">
                {selectedUser.isBlocked ? "Blocked" : "Active"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
