import { Bell, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-green-200 bg-white px-4 shadow-sm">
      <SidebarTrigger className="text-green-800 hover:bg-green-100 hover:text-green-900" />

      <div className="hidden flex-1 md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="w-full max-w-sm rounded-md border-green-200 bg-white pl-8 text-sm focus-visible:ring-green-500"
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
