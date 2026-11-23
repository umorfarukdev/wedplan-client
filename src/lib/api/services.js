import { BASE_URL } from "./base-url";
export const getAllServices = async () => {
  const response = await fetch(`${BASE_URL}/services`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
  return response.json();
};

export const getServiceById = async (id) => {
  const response = await fetch(`${BASE_URL}/service/${id}`, {cache: "no-store"});
  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }
  return response.json();
};
