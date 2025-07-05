import { Bell, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-green-200 bg-white px-4 shadow-sm">
      <SidebarTrigger className="text-green-800 hover:bg-green-100 hover:text-green-900" />

      <div className="flex flex-1 items-center justify-end gap-4">
        <Link href={"/dashboard/activity"}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-green-200 text-green-800 hover:bg-green-100 hover:text-green-900"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </Link>

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
