import { authClient } from "@/app/lib/auth-client";

export const getTokenClient = async () => {
  const { data } = await authClient.token();

  if (!data) {
    return;
  }

  const token = data?.token;

  return token;
};
