"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LayoutDashboard, Settings, LogOut, ArrowRight } from "lucide-react";

import { signOut, useSession } from "@/app/lib/auth-client";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function ProfileDropdown({ closeMenu }) {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  // Only show loader while session is loading
  if (isPending) {
    return <Spinner />;
  }

  // User is not logged in
  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/sign-in" onClick={closeMenu}>
          <Button variant="outline" className="w-full rounded-full">
            Login
          </Button>
        </Link>

        <Link href="/sign-up" onClick={closeMenu}>
          <Button className="w-full rounded-full bg-rose-500 text-white hover:bg-rose-600">
            Get Started
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
      </div>
    );
  }

  const dashboardPath = {
    admin: "/dashboard/admin",
    vendor: "/dashboard/vendor/overview",
    customer: "/dashboard/customer/overview",
  };
  const role = user.role || "customer";
  const userDashboard = dashboardPath[role] || "/dashboard/customer/overview";

  const handleLogout = async () => {
    try {
      await signOut();
      closeMenu?.();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-full outline-none">
        <Avatar className="h-11 w-11 border">
          {user.image && (
            <AvatarImage src={user.image} alt={user.name || "User"} />
          )}
          <AvatarFallback>
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="hidden text-left md:block">
          <h4 className="text-sm font-semibold">{user.name}</h4>
          <p className="text-xs text-muted-foreground capitalize">{role}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 overflow-hidden rounded-2xl p-0"
      >
        <div className="flex gap-3 p-4">
          <Avatar className="h-12 w-12">
            {user.image && (
              <AvatarImage src={user.image} alt={user.name || "User"} />
            )}
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>

            <span className="mt-2 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-medium capitalize text-rose-600">
              {role}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={<Link href={userDashboard} />}
          className="flex cursor-pointer items-center gap-3 py-3"
        >
          <LayoutDashboard className="h-5 w-5 text-rose-500" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href="/profile" />}
          className="flex cursor-pointer items-center gap-3 py-3"
        >
          <Settings className="h-5 w-5 text-rose-500" />
          Profile Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer py-3 text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
