import { getTokenServer } from "../core/getTokenServer";
import { BASE_URL } from "./base-url";
import { getAuthHeaders } from "@/lib/server/auth-headers";

export const getAdminOverview = async () => {
  const res = await fetch(`${BASE_URL}/admin/dashboard`, {
    headers: await getAuthHeaders({
      // authorization: `Bearer ${await getTokenServer()}`,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to fetch dashboard");
  }

  return res.json();
};

// Get admin services
export async function getAdminServices(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ""),
  ).toString();

  const response = await fetch(
    `${BASE_URL}/admin/services${query ? `?${query}` : ""}`,
    {
      headers: await getAuthHeaders(),
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch services");
  }

  return data;
}

// Get all payment transactions (admin)
export async function getAdminTransactions() {
  const response = await fetch(`${BASE_URL}/admin/transactions`, {
    headers: await getAuthHeaders( ),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch transactions");
  }

  return data;
}
