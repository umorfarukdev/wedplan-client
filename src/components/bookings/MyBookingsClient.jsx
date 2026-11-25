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

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cancelBooking } from "@/lib/actions/customer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MyBookingsClient = ({ bookings = [] }) => {
  const router = useRouter();
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

  const handleDeletePendingBooking = async (id) => {
    try {
      await cancelBooking(id);
      toast.success("Booking deleted successfully");
      router.refresh(); // Refresh the page to reflect the changes

      // If you're using state:
      // setBookings((prev) => prev.filter((booking) => booking._id !== id));

      // Or refresh the page/data:
      // router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete booking");
    }
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

        {/* Bookings Table */}
        {bookings.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <ClipboardList className="mx-auto size-10 text-rose-600" />

              <h2 className="mt-4 text-xl font-semibold">No bookings yet</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                You have not submitted any booking requests.
              </p>

              <Link
                href="/services"
                className="inline-flex mt-5 items-center justify-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Explore Services
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden rounded-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/60">
                      <TableHead>Service</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Event Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking._id}>
                        {/* Service */}
                        <TableCell>
                          <div className="flex items-center gap-3 min-w-[180px]">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={booking.image || "/placeholder.jpg"}
                                alt={booking.serviceName || "Wedding service"}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>

                            <div>
                              <p className="font-semibold">
                                {booking.serviceName || "Wedding Service"}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                ID: {booking._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Vendor */}
                        <TableCell>{booking.vendorName || "Vendor"}</TableCell>

                        {/* Event Date */}
                        <TableCell>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <CalendarDays className="size-4 text-muted-foreground" />
                            {formatDate(booking.eventDate)}
                          </div>
                        </TableCell>

                        {/* Location */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-muted-foreground" />
                            {booking.eventLocation || "Not specified"}
                          </div>
                        </TableCell>

                        {/* Requested */}
                        <TableCell>
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <Clock className="size-4 text-muted-foreground" />
                            {formatDate(booking.createdAt)}
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            className={`${getStatusStyle(booking.status)} capitalize`}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/services/${booking.serviceId}`}
                              className="inline-flex items-center gap-1 rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted transition-colors"
                            >
                              <Eye className="size-4" />
                              Details
                            </Link>

                            {booking.status === "pending" && (
                              <Button
                                onClick={() =>
                                  handleDeletePendingBooking(booking._id)
                                }
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                type="button"
                              >
                                <XCircle className="size-4" />
                                Cancel
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
        )}
      </div>
    </main>
  );
};

export default MyBookingsClient;
