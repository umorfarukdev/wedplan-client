import { BASE_URL } from "../api/base-url";

export const applyBooking = async (bookingData) => {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) {
    throw new Error("Failed to apply booking");
  }
  return response.json();
};

export const getMyBookings = async (email) => {
  const response = await fetch(`${BASE_URL}/my-bookings/${email}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
};

export const cancelBooking = async (id) => {
  const response = await fetch(`${BASE_URL}/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  return data;
};

// Get booking requests received by the logged-in vendor
export const getVendorBookings = async () => {
  const response = await fetch(`${BASE_URL}/bookings`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch booking requests");
  }

  return data;
};

// Accept or reject a booking request
export const updateBookingStatus = async (bookingId, status) => {
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update booking status");
  }

  return data;
};
