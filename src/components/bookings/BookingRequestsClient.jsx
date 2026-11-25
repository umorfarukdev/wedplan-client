"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  CalendarDays,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ClipboardList,
  Loader2,
  ArrowRight,
  Inbox,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateBookingStatus } from "@/lib/actions/booking";


const BookingRequestsClient = ({ initialBookings, error }) => {
  const router = useRouter();

  const [bookings, setBookings] = useState(initialBookings || []);
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    try {
      setUpdatingId(id);

      await updateBookingStatus(id, status, initialBookings[0]?.vendorId);

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id ? { ...booking, status } : booking,
        ),
      );

      toast.success(
        status === "accepted"
          ? "Booking request accepted successfully."
          : "Booking request rejected successfully.",
      );

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not update booking.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not specified";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      cancelled: "bg-gray-100 text-gray-600",
      completed: "bg-blue-100 text-blue-700",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  // Keep your existing return JSX here.
  // Use the updated field names shown below.

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-rose-600">
            Vendor Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Booking Requests
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Review incoming wedding inquiries from couples. Pending requests can
            be accepted or rejected once.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <h2 className="mt-2 text-3xl font-bold tabular-nums">
                  {bookings.length}
                </h2>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <ClipboardList className="size-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Requests
                </p>
                <h2 className="mt-2 text-3xl font-bold tabular-nums">
                  {bookings.filter((b) => b.status === "pending").length}
                </h2>
              </div>
              <div className="rounded-xl bg-amber-100 p-3">
                <Clock className="size-6 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Accepted Requests
                </p>
                <h2 className="mt-2 text-3xl font-bold tabular-nums">
                  {bookings.filter((b) => b.status === "accepted").length}
                </h2>
              </div>
              <div className="rounded-xl bg-green-100 p-3">
                <CheckCircle2 className="size-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="border-b px-5 py-5 sm:px-6">
            <CardTitle className="text-xl">Incoming Requests</CardTitle>
            <p className="text-sm text-muted-foreground">
              Review the details and respond to couples.
            </p>
          </CardHeader>

          <CardContent className="p-5 sm:p-6">
            {bookings.length === 0 ? (
              <div className="flex flex-col items-center py-14 text-center">
                <div className="rounded-full bg-rose-100 p-5">
                  <Inbox className="size-9 text-rose-600" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  No booking requests received yet
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Once couples discover your approved services, their booking
                  inquiries will appear here.
                </p>

                <Button
                  className="mt-5 bg-rose-600 text-white hover:bg-rose-700"
                  onClick={() => router.push("/dashboard/vendor/services")}
                >
                  Manage My Services
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                {bookings.map((booking) => {
                  const isUpdating = updatingId === booking._id;

                  return (
                    <div
                      key={booking._id}
                      className="rounded-xl border p-4 sm:p-5"
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {booking.service?.title ||
                              booking.service?.serviceName ||
                              "Wedding Service"}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Booking request received on{" "}
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>

                        <Badge
                          className={`w-fit capitalize ${getStatusStyle(
                            booking.status,
                          )}`}
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-muted p-2">
                            <UserRound className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Customer
                            </p>
                            <p className="text-sm font-medium">
                              {booking.customer?.name ||
                                booking.customer?.fullName ||
                                booking.customerEmail ||
                                "Customer"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.customer?.email || booking.customerEmail}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-muted p-2">
                            <CalendarDays className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Event Date
                            </p>
                            <p className="text-sm font-medium">
                              {formatDate(booking.eventDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-muted p-2">
                            <MapPin className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Event Location
                            </p>
                            <p className="text-sm font-medium">
                              {booking.eventLocation || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.message && (
                        <div className="mt-5 rounded-lg bg-muted/50 p-4">
                          <p className="text-xs font-semibold text-muted-foreground">
                            CUSTOMER MESSAGE
                          </p>
                          <p className="mt-2 text-sm leading-6">
                            {booking.message}
                          </p>
                        </div>
                      )}

                      {booking.status === "pending" ? (
                        <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:justify-end">
                          <Button
                            variant="outline"
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(booking._id, "rejected")
                            }
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            {isUpdating ? (
                              <Loader2 className="mr-2 size-4 animate-spin" />
                            ) : (
                              <XCircle className="mr-2 size-4" />
                            )}
                            Reject
                          </Button>

                          <Button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(booking._id, "accepted")
                            }
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            {isUpdating ? (
                              <Loader2 className="mr-2 size-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="mr-2 size-4" />
                            )}
                            Accept Request
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-5 border-t pt-4 text-sm text-muted-foreground">
                          This request has already been {booking.status}.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default BookingRequestsClient;
