"use server";

import { BASE_URL } from "../api/base-url";
import { getAuthHeaders } from "../server/auth-headers";

// Get services for the admin table (client components)
export async function fetchAdminServices(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== "" && value !== "all",
    ),
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

// Update service status
export async function updateServiceStatus(id, status) {
  const response = await fetch(`${BASE_URL}/admin/services/${id}/status`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: JSON.stringify({
      status,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
}

// Toggle active status
export async function toggleServiceActive(id, isActive) {
  const response = await fetch(`${BASE_URL}/admin/services/${id}/toggle`, {
    method: "PATCH",
    headers: await getAuthHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      isActive,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update active status");
  }

  return data;
}

// Delete service
export async function deleteService(id) {
  const response = await fetch(`${BASE_URL}/admin/services/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete service");
  }

  return data;
}
