
"use client";

import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  Search,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  { title: "Total Bookings", value: "0", icon: CalendarDays },
  { title: "Pending Bookings", value: "0", icon: Clock },
  { title: "Accepted Bookings", value: "0", icon: CheckCircle },
];

export default function CustomerDashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back, {session?.user?.name || "Customer"}!
            </p>
          </div>

          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>
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
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/services">
                <Search className="mr-2 h-4 w-4" />
                Explore Services
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/dashboard/customer/bookings">
                <ClipboardList className="mr-2 h-4 w-4" />
                My Bookings
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="font-semibold">No bookings yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore wedding services and make your first booking.
              </p>
              <Button className="mt-5" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
