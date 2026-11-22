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
