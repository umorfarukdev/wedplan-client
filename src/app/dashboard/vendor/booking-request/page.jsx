import BookingRequestsClient from "@/components/bookings/BookingRequestsClient";
import { getVendorBookings } from "@/lib/api/bookings";

export const dynamic = "force-dynamic";

export default async function BookingRequestsPage() {
  let bookings = [];
  let error = null;

  // Temporary testing ID
  const vendorId = "6b0434982fca6ed342e97a69";

  try {
    const data = await getVendorBookings(vendorId);
    bookings = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Booking fetch error:", err);
    error = err.message || "Failed to load booking requests";
  }

  return (
    <BookingRequestsClient
      initialBookings={bookings}
      error={error}
    />
  );
}