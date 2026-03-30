import { headers } from "next/headers";
import MainPanel from "@/components/shared/dashboard/panels/MainPanel";
import { RolesType } from "@/proxy";
import SettingsPanel from "@/components/shared/dashboard/panels/SettingsPanel";
import AdminPanel from "@/components/shared/dashboard/panels/AdminPanel";
import VisitsPanel from "@/components/shared/dashboard/panels/VisitsPanel";
import NutritionPanel from "@/components/shared/dashboard/panels/NutritionPanel";
import GroupsPanel from "@/components/shared/dashboard/panels/GroupsPanel";
import AdvertisementsPanel from "@/components/shared/dashboard/panels/AdvertisementsPanel";
import { ReactNode } from "react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ panel: string }>;
}) {
  const { panel } = await params;
  const headerList = await headers();
  const fullname = decodeURIComponent(headerList.get("x-user-fullname") || "");
  const role = headerList.get("x-user-role") as RolesType;
  const login = decodeURIComponent(headerList.get("x-user-login") || "");
  const panelComponent: Record<string, ReactNode> = {
    main: <MainPanel fullname={fullname} role={role} />,
    settings: <SettingsPanel fullname={fullname} role={role} login={login} />,
    adminsPanel: <AdminPanel />,
    visits: <VisitsPanel role={role} />,
    nutrition: <NutritionPanel />,
    groups: <GroupsPanel />,
    advertisements: <AdvertisementsPanel role={role} />,
  };
  return (
    <main className={"flex-1 p-4 pb-28.25 lg:pb-0 lg:p-10"}>
      {panelComponent[panel]}
    </main>
  );
}
