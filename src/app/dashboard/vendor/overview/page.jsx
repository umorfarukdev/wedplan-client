import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/app/lib/auth";
import { getVendorOverview } from "@/lib/api/vendor";

import {
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  CalendarDays,
  Plus,
  Crown,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function VendorDashboard() {
  // Get authenticated session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  // Check vendor authentication
  if (!user?.id || user.role !== "vendor") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold">Access Denied</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Please login with a vendor account to access this dashboard.
            </p>

            <Link
              href="/sign-in"
              className="mt-5 inline-flex rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
            >
              Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch dashboard data using vendor ID
  let dashboard = null;

  try {
    dashboard = await getVendorOverview(user.id);
  } catch (error) {
    console.error("Vendor dashboard error:", error);
  }

  const stats = [
    {
      title: "Total Services",
      value: dashboard?.totalServices ?? 0,
      icon: BriefcaseBusiness,
      description: "All your submitted services",
    },
    {
      title: "Approved & Active",
      value: dashboard?.activeServices ?? 0,
      icon: CheckCircle,
      description: "Published wedding services",
    },
    {
      title: "Pending Requests",
      value: dashboard?.pendingBookings ?? 0,
      icon: Clock,
      description: "Waiting for your response",
    },
    {
      title: "Accepted Bookings",
      value: dashboard?.acceptedBookings ?? 0,
      icon: CalendarDays,
      description: "Confirmed customer bookings",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>

            <p className="mt-2 text-muted-foreground">
              Welcome back, {user.name || "Vendor"}! Monitor your published
              wedding services, incoming couple requests, and subscription
              status.
            </p>
          </div>

          <Badge variant="secondary" className="px-4 py-2">
            Vendor Account
          </Badge>
        </div>

        {/* API Error */}
        {!dashboard && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
            <p className="font-medium text-destructive">
              Unable to load dashboard data. Please try again later.
            </p>
          </div>
        )}

        {/* Statistics */}
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

                    <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <Icon className="h-9 w-9 text-primary" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Subscription Plan */}
        <Card>
          <CardContent className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 text-primary" />

                <h2 className="text-xl font-bold">Current Subscription Plan</h2>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Free Plan</h3>

                <Badge variant="secondary">Current Plan</Badge>
              </div>

              <p className="max-w-2xl text-sm text-muted-foreground">
                Free Plan allows up to 3 active wedding services. Upgrade to
                Premium for unlimited services.
              </p>

              <p className="text-sm text-muted-foreground">
                Active services: {dashboard?.activeServices ?? 0} / 3
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/vendor/overview/add-service"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Link>

              <Link
                href="/dashboard/vendor/overview/subscription"
                className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
