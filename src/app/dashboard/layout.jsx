
import Sidebar from "@/components/dashboard/Sidebar";
import { getSession } from "../lib/session";

export default async function DashboardLayout({ children }) {

    const session = await getSession();

    const role = session.user.role;

    return (

        <div className="flex">

            <Sidebar role={role} />

            <main className="flex-1">

                {/* <DashboardNavbar /> */}

                <div className="p-8">

                    {children}

                </div>

            </main>

        </div>

    );

}