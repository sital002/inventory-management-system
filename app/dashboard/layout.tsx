import { isAuthenticated } from "@/actions/auth";
import { Navbar } from "@/components/navbar";
import { InventorySidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "A simple inventory management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) redirect("/");
  return (
    <div>
      <SidebarProvider>
        <InventorySidebar />
        <SidebarInset>
          <Navbar />
          <div className="bg-green-50/30">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
