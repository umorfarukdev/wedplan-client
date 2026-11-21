
"use client";

import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import {
  Users,
  BriefcaseBusiness,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Settings,
  ClipboardList,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { title: "Total Users", value: "0", icon: Users },
  { title: "Total Vendors", value: "0", icon: BriefcaseBusiness },
  { title: "Total Services", value: "0", icon: ClipboardList },
  { title: "Total Bookings", value: "0", icon: CalendarDays },
  { title: "Total Payments", value: "0", icon: CreditCard },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back, {session?.user?.name || "Admin"}!
            </p>
          </div>

          <Badge className="px-4 py-2">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Administrator
          </Badge>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">
                      {item.value}
                    </h2>
                  </div>
                  <Icon className="h-9 w-9 text-primary" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Administration</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Button asChild className="justify-start">
              <Link href="/dashboard/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>

            <Button variant="outline" asChild className="justify-start">
              <Link href="/dashboard/admin/services">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Manage Services
              </Link>
            </Button>

            <Button variant="outline" asChild className="justify-start">
              <Link href="/dashboard/admin/bookings">
                <CalendarDays className="mr-2 h-4 w-4" />
                Manage Bookings
              </Link>
            </Button>

            <Button variant="outline" asChild className="justify-start">
              <Link href="/dashboard/admin/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Payments
              </Link>
            </Button>

            <Button variant="outline" asChild className="justify-start">
              <Link href="/dashboard/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
