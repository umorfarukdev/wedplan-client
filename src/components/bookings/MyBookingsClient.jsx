"use client";

import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  Clock,
  Eye,
  XCircle,
  Loader2,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const MyBookingsClient = ({ bookings = [] }) => {
  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(`${String(date).slice(0, 10)}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not specified";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      confirmed: "bg-green-100 text-green-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      cancelled: "bg-gray-100 text-gray-600",
      completed: "bg-blue-100 text-blue-700",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <p className="text-sm font-medium text-rose-600">
            CUSTOMER DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold">My Bookings</h1>

          <p className="mt-2 text-muted-foreground">
            View all your submitted booking requests.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Badge variant="outline">Total: {bookings.length}</Badge>

          <Badge className="bg-amber-100 text-amber-700">
            Pending: {bookings.filter((b) => b.status === "pending").length}
          </Badge>

          <Badge className="bg-green-100 text-green-700">
            Confirmed:{" "}
            {
              bookings.filter(
                (b) => b.status === "confirmed" || b.status === "accepted",
              ).length
            }
          </Badge>
        </div>

        {bookings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <ClipboardList className="mx-auto size-10 text-rose-600" />

              <h2 className="mt-4 text-xl font-semibold">No bookings yet</h2>

              <Button asChild className="mt-5 bg-rose-600">
                <Link href="/services">Explore Services</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <Card key={booking._id} className="rounded-2xl overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex gap-5">
                    <div className="relative h-40 w-40">
                      <Image
                        src={booking.image || "/placeholder.jpg"}
                        alt="service"
                        fill
                        unoptimized
                        className="object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-xl">
                          {booking.serviceName || "Wedding Service"}
                        </h2>

                        <Badge className={getStatusStyle(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <p className="text-sm mt-2">
                        Vendor: {booking.vendorName || "Vendor"}
                      </p>

                      <div className="mt-4 space-y-2 text-sm">
                        <p className="flex gap-2">
                          <CalendarDays size={16} />
                          Event: {formatDate(booking.eventDate)}
                        </p>

                        <p className="flex gap-2">
                          <MapPin size={16} />
                          {booking.eventLocation}
                        </p>

                        <p className="flex gap-2">
                          <Clock size={16} />
                          Requested: {formatDate(booking.createdAt)}
                        </p>
                      </div>

                      <div className="mt-5 border-t pt-4 flex gap-3">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/services/${booking.serviceId}`}>
                            <Eye size={16} />
                            Details
                          </Link>
                        </Button>

                        {booking.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                          >
                            <XCircle size={16} />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsClient;
