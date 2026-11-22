"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/lib/config/dashboard-links";
import { cn } from "cn";

export default function Sidebar({ role }) {

    const pathname = usePathname();

    return (

        <aside className="w-72 border-r bg-background h-screen">

            <div className="p-6">

                <h2 className="text-2xl font-bold">
                    WedPlan
                </h2>

            </div>

            <nav className="space-y-2 px-3">

                {dashboardLinks[role]?.map((item) => (

                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(

                            "flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted transition",

                            pathname === item.href &&
                                "bg-primary text-primary-foreground"

                        )}
                    >

                        <item.icon className="h-5 w-5" />

                        {item.title}

                    </Link>

                ))}

            </nav>

        </aside>

    );

}