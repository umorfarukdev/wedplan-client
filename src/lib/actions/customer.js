import { BASE_URL } from "../api/base-url";

export const cancelBooking = async (id) => {
  const response = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel delete");
  }

  return data;
};
