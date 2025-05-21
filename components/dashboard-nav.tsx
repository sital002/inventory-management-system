"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Box,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardNav() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <Sidebar className="border-r border-green-200 bg-white">
      <SidebarHeader className="border-b border-green-200 p-4">
        <div className="flex items-center gap-2">
          <Box className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold text-green-800">InvenTrack</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "dashboard"}
              onClick={() => setActiveItem("dashboard")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "dashboard" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "inventory"}
              onClick={() => setActiveItem("inventory")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "inventory" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard/inventory">
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "orders"}
              onClick={() => setActiveItem("orders")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "orders" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard/orders">
                <ShoppingCart className="h-5 w-5" />
                <span>Orders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "suppliers"}
              onClick={() => setActiveItem("suppliers")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "suppliers" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard/suppliers">
                <Truck className="h-5 w-5" />
                <span>Suppliers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "customers"}
              onClick={() => setActiveItem("customers")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "customers" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard/customers">
                <Users className="h-5 w-5" />
                <span>Customers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "reports"}
              onClick={() => setActiveItem("reports")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "reports" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard/reports">
                <BarChart3 className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-green-200 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activeItem === "settings"}
              onClick={() => setActiveItem("settings")}
              className={cn(
                "hover:bg-green-50",
                activeItem === "settings" && "bg-green-100 text-green-800"
              )}
            >
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
