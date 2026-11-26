import { BASE_URL } from "../api/base-url";

// Update service status
export async function updateServiceStatus(id, status) {
  const response = await fetch(`${BASE_URL}/admin/services/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
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
    headers: {
      "Content-Type": "application/json",
    },
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
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete service");
  }

  return data;
}