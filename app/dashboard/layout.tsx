import { Navbar } from "@/components/navbar";
import { InventorySidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "A simple inventory management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <InventorySidebar />
        <SidebarInset>
          <Navbar />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
