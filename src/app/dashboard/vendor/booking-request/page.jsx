import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import BookingRequestsClient from "@/components/bookings/BookingRequestsClient";
import { getVendorBookings } from "@/lib/api/bookings";

export const dynamic = "force-dynamic";

export default async function BookingRequestsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const vendorId = session?.user?.id;

  if (!vendorId) {
    return (
      <div className="p-10 text-center">
        Please login with a vendor account to view booking requests.
      </div>
    );
  }

  let bookings = [];
  let error = null;

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
