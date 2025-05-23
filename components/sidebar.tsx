import {
  BarChart3,
  Box,
  ClipboardList,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function InventorySidebar() {
  return (
    <Sidebar className="border-r border-green-200 bg-green-100">
      <SidebarHeader className="bg-green-200 pb-4">
        <div className="flex items-center gap-2 px-4 pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-600 text-white">
            <Box className="h-6 w-6" />
          </div>
          <div className="font-semibold text-green-900">Inventory Pro</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900"
                  isActive
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
                  <ClipboardList className="h-5 w-5" />
                  <span>Categories</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
                  <Truck className="h-5 w-5" />
                  <span>Suppliers</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">
            Reports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
                  <BarChart3 className="h-5 w-5" />
                  <span>Sales Report</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
                  <Package className="h-5 w-5" />
                  <span>Inventory Report</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-green-200 bg-green-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
              <Users className="h-5 w-5" />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
