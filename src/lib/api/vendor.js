import { BASE_URL } from "./base-url";

export const getServiceByVendorId = async (vendorId) => {
  const response = await fetch(`${BASE_URL}/vendor/services/${vendorId}`);

  return response.json();
};

export const getVendorOverview = async (vendorId) => {
  if (!vendorId) {
    throw new Error("Vendor ID is required");
  }

  const response = await fetch(
    `${BASE_URL}/vendor/dashboard?vendorId=${vendorId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  return response.json();
};
