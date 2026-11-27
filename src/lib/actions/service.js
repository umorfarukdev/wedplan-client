"use server";

import { BASE_URL } from "../api/base-url";
import { getAuthHeaders } from "../server/auth-headers";

export const createService = async (serviceData) => {
  const response = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: await getAuthHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.message,
      upgradeRequired: data.upgradeRequired || false,
    };
  }

  return {
    success: true,
    data,
  };
};