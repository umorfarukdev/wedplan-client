
"use client";

import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import {
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  Plus,
  CalendarDays,
  CreditCard,
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
  { title: "Total Services", value: "0", icon: BriefcaseBusiness },
  { title: "Active Services", value: "0", icon: CheckCircle },
  { title: "Pending Requests", value: "0", icon: Clock },
  { title: "Accepted Bookings", value: "0", icon: CalendarDays },
];

export default function VendorDashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back, {session?.user?.name || "Vendor"}!
            </p>
          </div>

          <Badge variant="secondary" className="px-4 py-2">
            Vendor Account
          </Badge>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create and manage your wedding services.
              </p>

              <Button className="w-full">
                <Link href="/dashboard/vendor/services">
                  <BriefcaseBusiness className="mr-2 h-4 w-4" />
                  Manage Services
                </Link>
              </Button>

              <Button variant="outline" className="w-full">
                <Link href="/dashboard/vendor/services/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Review and manage customer booking requests.
              </p>

              <Button className="w-full">
                <Link href="/dashboard/vendor/bookings">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Manage Bookings
                </Link>
              </Button>

              <Button variant="outline" className="w-full">
                <Link href="/dashboard/vendor/subscription">
                  <CreditCard className="mr-2 h-4 w-4" />
                  My Subscription
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Free Plan</h3>
              <p className="text-sm text-muted-foreground">
                View and manage your subscription plan.
              </p>
            </div>
            <Button variant="outline" >
              <Link href="/dashboard/vendor/subscription">
                View Subscription
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

