
import { BASE_URL } from "./base-url";

export const getCustomerOverview = async (email, signal) => {
  const res = await fetch(
    `${BASE_URL}/customer/dashboard?email=${email}`,
    {
      cache: "no-store",
      credentials: "include",
      signal
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch customer dashboard");
  }

  return res.json();
};
