
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

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

import {
  getMyBookings,
  cancelBooking,
} from "@/lib/actions/booking";

const MyBookingsClient = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking
  const handleCancelBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(id);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Please login first.");
      }

      await cancelBooking(id, token);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(
      `${String(date).slice(0, 10)}T00:00:00`
    );

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not specified";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Status styles
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

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-rose-600">
            CUSTOMER DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            My Bookings
          </h1>

          <p className="mt-2 text-muted-foreground">
            View all your submitted booking requests and cancel
            pending inquiries if plans change.
          </p>
        </div>

        {/* Booking Count */}
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="px-3 py-1.5">
            Total Bookings: {bookings.length}
          </Badge>

          <Badge className="bg-amber-100 px-3 py-1.5 text-amber-700 hover:bg-amber-100">
            Pending:{" "}
            {bookings.filter((b) => b.status === "pending").length}
          </Badge>

          <Badge className="bg-green-100 px-3 py-1.5 text-green-700 hover:bg-green-100">
            Confirmed:{" "}
            {bookings.filter(
              (b) =>
                b.status === "confirmed" ||
                b.status === "accepted"
            ).length}
          </Badge>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-rose-600" />
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <Card className="rounded-2xl border-dashed">
            <CardContent className="flex flex-col items-center py-16 text-center">
              <div className="rounded-full bg-rose-100 p-5">
                <ClipboardList className="size-9 text-rose-600" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                No bookings yet
              </h2>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                You have not submitted any wedding service
                booking requests yet.
              </p>

              <Button
                asChild
                className="mt-6 bg-rose-600 hover:bg-rose-700"
              >
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Booking List */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <Card
                key={booking._id}
                className="overflow-hidden rounded-2xl"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* Service Image */}
                    <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl sm:h-44 sm:w-52">
                      <Image
                        src={booking.image || "/placeholder.jpg"}
                        alt={booking.serviceName || "Wedding service"}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 208px"
                        className="object-cover"
                      />
                    </div>

                    {/* Booking Information */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-5">
                      <div className="space-y-3">

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h2 className="text-lg font-bold sm:text-xl">
                            {booking.serviceName || "Wedding Service"}
                          </h2>

                          <Badge
                            className={`capitalize ${getStatusStyle(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Vendor:{" "}
                          <span className="font-medium text-foreground">
                            {booking.vendorName || "Wedding Vendor"}
                          </span>{" "}
                          •{" "}
                          <span className="font-semibold text-rose-600">
                            ${Number(booking.price || 0).toLocaleString("en-US")}
                          </span>
                        </p>

                        {/* Event Details */}
                        <div className="grid gap-3 text-sm sm:grid-cols-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarDays className="size-4 shrink-0 text-rose-500" />
                            <span>
                              Event: {formatDate(booking.eventDate)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="size-4 shrink-0 text-rose-500" />
                            <span className="truncate">
                              {booking.eventLocation || "Not specified"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="size-4 shrink-0 text-rose-500" />
                            <span>
                              Requested: {formatDate(booking.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 border-t pt-4">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Link href={`/services/${booking.serviceId}`}>
                            <Eye className="size-4" />
                            Details
                          </Link>
                        </Button>

                        {booking.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={cancellingId === booking._id}
                            onClick={() =>
                              handleCancelBooking(booking._id)
                            }
                            className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            {cancellingId === booking._id ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <XCircle className="size-4" />
                            )}

                            Cancel Request
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
