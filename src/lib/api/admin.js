import { BASE_URL } from "./base-url";


export const getAdminOverview = async () => {

  const res = await fetch(
    `${BASE_URL}/admin/dashboard`,
    {
      cache:"no-store"
    }
  );


  if(!res.ok){
    throw new Error("Failed to fetch dashboard");
  }


  return res.json();

};