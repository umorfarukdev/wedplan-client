import { BASE_URL } from "../api/base-url";

export const createService = async (serviceData) => {
  const response = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);

    error.upgradeRequired = data.upgradeRequired;

    throw error;
  }

  return data;
};
