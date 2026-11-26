import { getAllUsers } from "@/lib/actions/auth-user";
import UsersClient from "./UsersClient";


export default async function ManageUsersPage(){

const result = await getAllUsers({
  limit:50
});


return (
  <UsersClient
    initialUsers={result.users || []}
  />
);

}