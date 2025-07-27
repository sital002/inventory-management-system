"use client";

import { usePathname } from "next/navigation";

import {
  Box,
  ClipboardList,
  Home,
  Package,
  Truck,
  Users,
  CreditCard,
  RefreshCw,
  Activity,
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
  { icon: Truck, label: "Suppliers", href: "/dashboard/suppliers" },
];

const salesMenuItems = [
  { icon: CreditCard, label: "Point of Sale", href: "/dashboard/pos" },
  { icon: Activity, label: "Sales History", href: "/dashboard/sales" },
  {
    icon: RefreshCw,
    label: "Reorder Stock",
    href: "/dashboard/products/reorder/new",
  },
];

const footerMenuItems = [
  { icon: Users, label: "Users", href: "/dashboard/users" },
];

export function InventorySidebar() {
  const pathname = usePathname();

  const renderMenuItems = (items: typeof mainMenuItems) =>
    items.map(({ icon: Icon, label, href }) => (
      <SidebarMenuItem key={label}>
        <SidebarMenuButton
          className="text-green-900 hover:bg-green-200 hover:text-green-900 data-[active=true]:bg-green-200 data-[active=true]:text-green-900"
          data-active={pathname === href || pathname.startsWith(href + "/")}
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
          <SidebarGroupLabel className="text-green-800">
            Inventory
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(mainMenuItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">
            Sales & Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(salesMenuItems)}</SidebarMenu>
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
