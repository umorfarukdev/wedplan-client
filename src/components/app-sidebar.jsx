import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="px-4 py-3 text-xl font-bold">
          WedPlan
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* Customer sidebar menu */}
        </SidebarGroup>

        <SidebarGroup>
          {/* Additional menu */}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="p-4 text-sm">Customer Panel</p>
      </SidebarFooter>
    </Sidebar>
  );
}