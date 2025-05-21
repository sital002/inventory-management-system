"use client";

import { useState } from "react";
import {
  BarChart3,
  Box,
  ClipboardList,
  Home,
  Layers,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Inventory management navigation items
const inventoryItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Products",
    icon: Package,
    url: "/products",
    items: [
      {
        title: "All Products",
        url: "/products",
      },
      {
        title: "Add New Product",
        url: "/products/new",
      },
      {
        title: "Categories",
        url: "/products/categories",
      },
    ],
  },
  {
    title: "Inventory",
    icon: Box,
    url: "/inventory",
    items: [
      {
        title: "Stock Levels",
        url: "/inventory/stock",
      },
      {
        title: "Adjustments",
        url: "/inventory/adjustments",
      },
      {
        title: "Transfers",
        url: "/inventory/transfers",
      },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "/orders",
    items: [
      {
        title: "All Orders",
        url: "/orders",
      },
      {
        title: "Pending",
        url: "/orders/pending",
      },
      {
        title: "Completed",
        url: "/orders/completed",
      },
    ],
  },
  {
    title: "Suppliers",
    icon: Truck,
    url: "/suppliers",
  },
  {
    title: "Customers",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Reports",
    icon: BarChart3,
    url: "/reports",
    items: [
      {
        title: "Sales Report",
        url: "/reports/sales",
      },
      {
        title: "Inventory Report",
        url: "/reports/inventory",
      },
      {
        title: "Supplier Report",
        url: "/reports/suppliers",
      },
    ],
  },
];

interface InventorySidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function DashboardSidebar({
  isOpen = false,
  onClose,
  className,
}: InventorySidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const SidebarContent = () => (
    <div
      className={cn(
        "flex h-screen flex-col bg-green-50 text-gray-800 ",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center border-b border-green-100 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
            <Layers className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Inventory Pro</span>
              <span className="text-xs">Management System</span>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <div className="px-3">
          <div className="mb-2 px-2 text-xs font-medium uppercase text-gray-500">
            {!collapsed && "Main Navigation"}
          </div>
          <nav className="space-y-1">
            {inventoryItems.map((item) => (
              <div key={item.title}>
                <a
                  href={item.url}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium",
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.title}</span>}
                </a>

                {!collapsed && item.items?.length && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-green-100 pl-2">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.url}
                        className="block rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-green-100 hover:text-green-700"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-green-100 p-4">
        <div className="space-y-1">
          <a
            href="/settings"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-700"
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span>Settings</span>}
          </a>
          <a
            href="/docs"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-700"
          >
            <ClipboardList className="h-5 w-5" />
            {!collapsed && <span>Documentation</span>}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[280px] p-0">
          <div className="flex h-full flex-col bg-green-50 text-gray-800">
            <div className="flex h-16 items-center border-b border-green-100 px-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Inventory Pro</span>
                  <span className="text-xs">Management System</span>
                </div>
              </Link>
            </div>

            <div className="flex-1 overflow-auto py-4">
              <div className="px-3">
                <div className="mb-2 px-2 text-xs font-medium uppercase text-gray-500">
                  Main Navigation
                </div>
                <nav className="space-y-1">
                  {inventoryItems.map((item) => (
                    <div key={item.title}>
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium",
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>

                      {item.items?.length && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-green-100 pl-2">
                          {item.items.map((subItem) => (
                            <a
                              key={subItem.title}
                              href={subItem.url}
                              className="block rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-green-100 hover:text-green-700"
                            >
                              {subItem.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            <div className="border-t border-green-100 p-4">
              <div className="space-y-1">
                <a
                  href="/settings"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-700"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
                <a
                  href="/docs"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:text-green-700"
                >
                  <ClipboardList className="h-5 w-5" />
                  <span>Documentation</span>
                </a>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
