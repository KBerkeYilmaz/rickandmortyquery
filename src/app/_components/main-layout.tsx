"use client";
import { usePathname } from "next/navigation";
import DashboardLayout from "./dashboard";
import AppLayout from "./app-layout";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname.includes("/dashboard")) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return <AppLayout>{children}</AppLayout>;
};

export default MainLayout;
