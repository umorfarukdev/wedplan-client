import { BASE_URL } from "./base-url";
import { getAuthHeaders } from "@/lib/server/auth-headers";

// Get vendor bookings
export async function getVendorBookings(vendorId) {
  if (!vendorId) {
    throw new Error("Vendor ID is required");
  }

  const response = await fetch(`${BASE_URL}/vendor/bookings/${vendorId}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return data;
}
