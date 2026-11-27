import { BASE_URL } from "./base-url";
import { getAuthHeaders } from "@/lib/server/auth-headers";

export const getCustomerOverview = async (email, signal) => {
  const query = email ? `?email=${encodeURIComponent(email)}` : "";

  const res = await fetch(`${BASE_URL}/customer/dashboard${query}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
    signal,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch customer dashboard");
  }

  return res.json();
};

export async function getCustomerServices() {
  const res = await fetch(`${BASE_URL}/customer/services`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}
