"use client";

import { usePathname } from "next/navigation";

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
import Link from "next/link";

const mainMenuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  { icon: ClipboardList, label: "Categories", href: "/dashboard/categories" },
  { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
  { icon: Truck, label: "Suppliers", href: "/dashboard/suppliers" },
];

const reportMenuItems = [
  { icon: BarChart3, label: "Sales Report", href: "/reports/sales" },
  { icon: Package, label: "Inventory Report", href: "/reports/inventory" },
];

const footerMenuItems = [
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function InventorySidebar() {
  const pathname = usePathname();

  const renderMenuItems = (items: typeof mainMenuItems) =>
    items.map(({ icon: Icon, label, href }) => (
      <SidebarMenuItem key={label}>
        <SidebarMenuButton
          className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900"
          data-active={pathname === href}
          asChild
        >
          <Link href={href} className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

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
            <SidebarMenu>{renderMenuItems(mainMenuItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">
            Reports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(reportMenuItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-green-200 bg-green-100">
        <SidebarMenu>{renderMenuItems(footerMenuItems)}</SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
