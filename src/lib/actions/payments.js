import { BASE_URL } from "../api/base-url";

export const checkoutVerify = async (sessionId) => {
  const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });
  return response.json();
};
