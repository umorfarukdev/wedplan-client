import { getAdminServices } from "@/lib/api/admin";
import ManageServicesClient from "./ManageServicesClient";

export default async function ManageServicesPage() {
  const services = await getAdminServices();

  return <ManageServicesClient initialServices={services} />;
}
