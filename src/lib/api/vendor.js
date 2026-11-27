import { BASE_URL } from "./base-url";
import { getAuthHeaders } from "@/lib/server/auth-headers";

export const getServiceByVendorId = async (vendorId) => {
  const response = await fetch(`${BASE_URL}/vendor/services/${vendorId}`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  return response.json();
};

export const getVendorOverview = async (vendorId) => {
  if (!vendorId) {
    throw new Error("Vendor ID is required");
  }

  const response = await fetch(
    `${BASE_URL}/vendor/dashboard?vendorId=${encodeURIComponent(vendorId)}`,
    {
      method: "GET",
      headers: await getAuthHeaders(),
      cache: "no-store",
    },
  );

  return response.json();
};
