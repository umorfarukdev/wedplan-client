
import Sidebar from "@/components/dashboard/Sidebar";
import { requireSession } from "../lib/session";
import { normalizeRole } from "@/lib/roles";

export default async function DashboardLayout({ children }) {

    const session = await requireSession();

    const role = normalizeRole(session.user?.role);

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