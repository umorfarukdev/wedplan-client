
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  ClipboardList,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { getCustomerOverview } from "@/lib/api/customer";

// Use your actual server-side Better Auth configuration path
import { auth } from "@/app/lib/auth";

const statsConfig = [
  {
    key: "totalBookings",
    title: "Total Booking Requests",
    icon: CalendarDays,
    color: "bg-rose-100 text-rose-700",
  },
  {
    key: "pendingBookings",
    title: "Pending Bookings",
    icon: Clock,
    color: "bg-amber-100 text-amber-700",
  },
  {
    key: "acceptedBookings",
    title: "Accepted Bookings",
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "rejectedBookings",
    title: "Rejected Bookings",
    icon: XCircle,
    color: "bg-red-100 text-red-700",
  },
];

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const [year, month, day] = date.split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusStyle = (status) => {
  const styles = {
    pending: "border-amber-300 text-amber-700 bg-amber-50",
    accepted: "border-emerald-300 text-emerald-700 bg-emerald-50",
    rejected: "border-red-300 text-red-700 bg-red-50",
    cancelled: "border-gray-300 text-gray-700 bg-gray-50",
  };

  return styles[status?.toLowerCase()] || styles.pending;
};

export default async function CustomerPage() {
  // 1. Get authenticated session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Authentication check
  if (!session?.user) {
    redirect("/login");
  }

  const email = session.user.email;

  // 3. Initial dashboard data
  let dashboard = {
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    rejectedBookings: 0,
    recentBookings: [],
  };

  let error = "";

  // 4. Fetch customer dashboard
  try {
    const data = await getCustomerOverview(email);

    dashboard = {
      totalBookings: data.totalBookings ?? 0,
      pendingBookings: data.pendingBookings ?? 0,
      acceptedBookings: data.acceptedBookings ?? 0,
      rejectedBookings: data.rejectedBookings ?? 0,
      recentBookings: data.recentBookings ?? [],
    };
  } catch (err) {
    console.error("Dashboard Error:", err);
    error = err.message || "Failed to load dashboard";
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-5">
          <div>
            <h1 className="text-3xl font-bold">
              Customer Overview
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Track your wedding service inquiries and confirmed vendors at a glance.
            </p>
          </div>

          <Avatar className="h-11 w-11">
            <AvatarFallback>
              {session.user.name?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsConfig.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.key}
                className="rounded-xl border-[#eadfd7] shadow-sm"
              >
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {dashboard[item.key]}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Bookings */}
        <Card className="rounded-xl border-[#eadfd7] shadow-sm">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-xl">
              Recent Booking Requests
            </CardTitle>

            <div className="flex gap-2">
              <Link
                href="/customer/bookings"
                className="rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
              >
                Manage All
              </Link>

              <Link
                href="/browse-services"
                className="flex items-center gap-2 rounded-lg bg-rose-700 px-4 py-2 text-sm text-white transition hover:bg-rose-800"
              >
                <Search className="h-4 w-4" />
                Browse Services
              </Link>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {error ? (
              <div className="py-10 text-center text-sm text-red-500">
                {error}
              </div>
            ) : dashboard.recentBookings.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground" />

                <h3 className="font-semibold">
                  No bookings yet
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Explore wedding services and make your first booking.
                </p>

                <Link
                  href="/browse-services"
                  className="mt-5 rounded-lg bg-rose-700 px-5 py-2 text-sm text-white hover:bg-rose-800"
                >
                  Explore Services
                </Link>
              </div>
            ) : (
              dashboard.recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-[#eadfd7] p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      {booking.serviceName || "Wedding Service"}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Event Date: {formatDate(booking.eventDate)}
                      {" • "}
                      {booking.eventLocation}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={`w-fit shrink-0 capitalize ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
