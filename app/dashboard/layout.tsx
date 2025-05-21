import { Navbar } from "@/components/navbar";
import { DashboardSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
      <Navbar />
      <SidebarProvider>
        <DashboardSidebar />
        {children}
      </SidebarProvider>
    </div>
  );
}
