import { BASE_URL } from "./base-url";

export const getAdminOverview = async () => {
  const res = await fetch(`${BASE_URL}/admin/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};

// Get admin services
export async function getAdminServices(params = {}) {
  const query = new URLSearchParams(params).toString();

  const response = await fetch(`${BASE_URL}/admin/services?${query}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch services");
  }

  return data;
}

