import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Package,
  ShoppingCart,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import Link from "next/link";

export async function QuickActions() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const quickActions = [
    {
      title: "Add New Item",
      description: "Add items to inventory",
      icon: Plus,
      href: "/inventory/add",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Manage Categories",
      description: "View and edit categories",
      icon: Package,
      href: "/categories",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Customer Orders",
      description: "Process customer orders",
      icon: ShoppingCart,
      href: "/customer-orders",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Reports",
      description: "View inventory reports",
      icon: BarChart3,
      href: "/reports",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      title: "Purchase Orders",
      description: "Manage supplier orders",
      icon: FileText,
      href: "/orders",
      color: "bg-teal-600 hover:bg-teal-700",
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      href: "/settings",
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  return (
    <Card className="bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">Quick Actions</CardTitle>
        <CardDescription className="text-green-700">
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-3 border-gray-200 hover:bg-gray-50 text-left"
              >
                <action.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900">
                    {action.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
