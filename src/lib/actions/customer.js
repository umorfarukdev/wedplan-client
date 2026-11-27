"use server";

import { BASE_URL } from "../api/base-url";
import { getAuthHeaders } from "../server/auth-headers";

export const cancelBooking = async (id) => {
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel booking");
  }

  return data;
};
