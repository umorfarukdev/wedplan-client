"use server";

import { BASE_URL } from "../api/base-url";
import { getAuthHeaders } from "../server/auth-headers";

export const applyBooking = async (bookingData) => {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: await getAuthHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(bookingData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Failed to apply booking");
  }

  return data;
};

export const getMyBookings = async (email) => {
  const response = await fetch(
    `${BASE_URL}/my-bookings/${encodeURIComponent(email)}`,
    {
      headers: await getAuthHeaders(),
      cache: "no-store",
    },
  );

  const data = await response.json().catch(() => []);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return data;
};

// Get booking requests received by the logged-in vendor
export const getVendorBookings = async (vendorId) => {
  if (!vendorId) {
    throw new Error("Vendor ID is required");
  }

  const response = await fetch(`${BASE_URL}/vendor/bookings/${vendorId}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch booking requests");
  }

  return data;
};

// Accept or reject a booking request
export const updateBookingStatus = async (id, status, vendorId) => {
  const response = await fetch(`${BASE_URL}/vendor/bookings/${id}/status`, {
    method: "PATCH",
    headers: await getAuthHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ status, vendorId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update booking status");
  }

  return data;
};
