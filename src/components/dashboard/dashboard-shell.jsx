"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutDashboard, LogOut, Settings } from "lucide-react";

import { signOut } from "@/app/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { getNavForRole, ROLE_LABEL } from "./nav-config";

function initials(name) {
  return (name || "U").trim().charAt(0).toUpperCase();
}

function AppSidebar({ role, user }) {
  const pathname = usePathname();
  const items = getNavForRole(role);
  const home = items[0]?.href || "/dashboard";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href={home} />}
              tooltip="WedPlan"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm">
                <Heart className="size-4 fill-white" />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-bold">WedPlan</span>
                <span className="truncate text-[11px] text-muted-foreground">
                  {ROLE_LABEL[role] || "Dashboard"}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  tooltip="Back to site"
                >
                  <Home />
                  <span>Back to site</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-lg bg-sidebar-accent/60 p-2 group-data-[collapsible=icon]:hidden">
          <Avatar className="size-8">
            {user.image ? (
              <AvatarImage src={user.image} alt={user.name || "User"} />
            ) : null}
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{user.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

function UserMenu({ role, user }) {
  const handleLogout = async () => {
    await signOut();
    window.location.assign("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 outline-none transition hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
        <Avatar className="size-8 border">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name || "User"} />
          ) : null}
          <AvatarFallback>{initials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="hidden text-left sm:block">
          <p className="max-w-32 truncate text-xs font-semibold leading-none">
            {user.name}
          </p>
          <p className="mt-1 text-[11px] capitalize text-muted-foreground">
            {role}
          </p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link href={`/dashboard/${role}/profile`} />}>
          <Settings />
          Profile Settings
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link href="/" />}>
          <Home />
          Back to site
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardShell({ role, user, children }) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} user={user} />

      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur sm:px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-5" />

          <div className="flex flex-1 items-center gap-2">
            <LayoutDashboard className="hidden size-4 text-muted-foreground sm:block" />
            <span className="text-sm font-medium">
              {ROLE_LABEL[role] || "Dashboard"}
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex">
              Private
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/services" />}
            className="hidden sm:inline-flex"
          >
            Browse services
          </Button>

          <UserMenu role={role} user={user} />
        </header>

        <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
