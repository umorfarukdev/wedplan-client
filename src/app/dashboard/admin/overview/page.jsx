import { getAdminOverview } from "@/lib/api/admin";
import AdminOverviewClient from "./AdminOverviewClient";



export default async function AdminOverviewPage(){

 const data = await getAdminOverview();


 return (
   <AdminOverviewClient data={data}/>
 );

}