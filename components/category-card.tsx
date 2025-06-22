"use client";

import Link from "next/link";
import {
  Package,
  AlertTriangle,
  DollarSign,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    description: string;
    itemCount: number;
    lowStockItems: number;
    totalValue: number;
    color: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const handleEdit = () => {
    console.log("Edit category:", category.name);
  };

  const handleDelete = () => {
    console.log("Delete category:", category.name);
  };

  return (
    <Card
      className={`${category.color} hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 relative group w-full`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Actions - Always visible on mobile */}
      <div className="absolute top-2 right-2 sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link href={`/dashboard/categories/${category.id}`} className="block">
        <CardHeader className="pb-3 pr-12">
          <div className="flex items-center justify-between mb-2">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            {category.lowStockItems > 0 && (
              <Badge
                variant="destructive"
                className="bg-red-100 text-red-800 border-red-200 text-xs"
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="hidden xs:inline">
                  {category.lowStockItems} low
                </span>
                <span className="xs:hidden">{category.lowStockItems}</span>
              </Badge>
            )}
          </div>
          <CardTitle className="text-green-900 text-base sm:text-lg leading-tight">
            {category.name}
          </CardTitle>
          <CardDescription className="text-green-700 text-sm line-clamp-2">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-green-700">Items:</span>
              <span className="font-medium text-green-900">
                {category.itemCount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-700">Value:</span>
              <span className="font-medium text-green-900">
                ${category.totalValue.toLocaleString()}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
          >
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Manage Inventory</span>
            <span className="xs:hidden">Manage</span>
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}
