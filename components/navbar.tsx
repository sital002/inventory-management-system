"use client";

import { useState } from "react";
import { Calendar, Download, Menu, Package, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Navbar({ onMenuClick, className }: NavbarProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex items-center gap-2 font-semibold">
        <Package className="h-5 w-5 text-green-600" />
        <span className="hidden sm:inline">Inventory Pro</span>
      </div>

      <div className="relative ml-auto flex-1 md:ml-0 md:max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search inventory..."
          className="w-full bg-white pl-8 md:max-w-sm"
        />
      </div>

      <div className="hidden items-center gap-4 md:flex ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {selectedPeriod === "7d"
                  ? "Last 7 days"
                  : selectedPeriod === "30d"
                  ? "Last 30 days"
                  : "This quarter"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Time period</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedPeriod("7d")}>
              Last 7 days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("30d")}>
              Last 30 days
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod("quarter")}>
              This quarter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="gap-1">
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="top" className="pt-10">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full pl-8"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => setSelectedPeriod("7d")}
              >
                <Calendar className="h-4 w-4" />
                <span>Last 7 days</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => setSelectedPeriod("30d")}
              >
                <Calendar className="h-4 w-4" />
                <span>Last 30 days</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => setSelectedPeriod("quarter")}
              >
                <Calendar className="h-4 w-4" />
                <span>This quarter</span>
              </Button>
            </div>

            <Button className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
