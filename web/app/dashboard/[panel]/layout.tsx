import { ReactNode } from "react";
import HeaderDashboard from "@/components/shared/dashboard/HeaderDashboard";
import SidebarDashboard from "@/components/shared/dashboard/SidebarDashboard";
import NavMobileDashboard from "@/components/shared/dashboard/NavMobileDashboard";
import { headers } from "next/headers";
import { RolesType } from "@/proxy";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = await headers();
  const role = headerList.get("x-user-role") as RolesType;
  const fullname = decodeURIComponent(headerList.get("x-user-fullname") || "");
  return (
    <div>
      <SidebarDashboard fullname={fullname || ""} role={role} />
      <div className={"flex flex-col lg:ml-64"}>
        <HeaderDashboard fullname={fullname || ""} role={role} />
        {children}
        <NavMobileDashboard role={role} />
      </div>
    </div>
  );
}
