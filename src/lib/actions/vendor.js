
"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { BASE_URL } from "../api/base-url";

const SERVICES_PATH = "/dashboard/vendor/overview/my-services";

// Get authenticated vendor
async function getVendorId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.id || user.role !== "vendor") {
    throw new Error("Unauthorized vendor access");
  }

  return user.id;
}

// Update service
export async function updateVendorService(serviceId, serviceData) {
  const vendorId = await getVendorId();

  const response = await fetch(`${BASE_URL}/services/${serviceId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...serviceData,
      vendorId,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update service");
  }

  revalidatePath(SERVICES_PATH);

  return data;
}

// Update availability
export async function toggleAvailabilityAction(formData) {
  const vendorId = await getVendorId();

  const serviceId = formData.get("serviceId");
  const currentStatus = formData.get("isActive") === "true";

  if (!serviceId) {
    throw new Error("Service ID is required");
  }

  const response = await fetch(
    `${BASE_URL}/services/${serviceId}/availability`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId,
        isActive: !currentStatus,
      }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update availability");
  }

  revalidatePath(SERVICES_PATH);

  return data;
}

// Delete service
export async function deleteVendorService(formData) {
  const vendorId = await getVendorId();

  const serviceId = formData.get("serviceId");

  if (!serviceId) {
    throw new Error("Service ID is required");
  }

  const response = await fetch(`${BASE_URL}/services/${serviceId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vendorId }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete service");
  }

  revalidatePath(SERVICES_PATH);

  return data;
}
