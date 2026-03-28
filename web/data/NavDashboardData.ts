import { ReactNode } from "react";
import {
  AdminsPanelIcon,
  AdvertisementsIcon,
  CalenderMarkIcon,
  HomeIcon,
  NutritionIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/icons";

type NavDashboardData = {
  title: string;
  icon: ReactNode;
  url: string;
};
export function NavDashboardData({
  role,
}: {
  role: "gl_admin" | "sad_admin" | "staff" | "user";
}) {
  const glAdminsNavDashboardData: NavDashboardData[] = [
    { title: "Главная", icon: HomeIcon(), url: "main" },
    { title: "Управление", icon: AdminsPanelIcon(), url: "adminsPanel" },
    { title: "Настройки", icon: SettingsIcon({ size: "md" }), url: "settings" },
  ];
  const sadAdminsNavDashboardData: NavDashboardData[] = [
    { title: "Главная", icon: HomeIcon(), url: "main" },
    { title: "Посещения", icon: CalenderMarkIcon(), url: "visits" },
    { title: "Объявления", icon: AdvertisementsIcon(), url: "advertisements" },
    { title: "Группы", icon: UsersIcon(), url: "groups" },
    { title: "Питание", icon: NutritionIcon({ size: "md" }), url: "nutrition" },
    { title: "Настройки", icon: SettingsIcon({ size: "md" }), url: "settings" },
  ];
  const staffNavDashboardData: NavDashboardData[] = [
    { title: "Главная", icon: HomeIcon(), url: "main" },
    { title: "Посещения", icon: CalenderMarkIcon(), url: "visits" },
    { title: "Объявления", icon: AdvertisementsIcon(), url: "advertisements" },
    { title: "Настройки", icon: SettingsIcon({ size: "md" }), url: "settings" },
  ];
  const userNavDashboardData: NavDashboardData[] = [
    { title: "Главная", icon: HomeIcon(), url: "main" },
    { title: "Посещения", icon: CalenderMarkIcon(), url: "visits" },
    { title: "Объявления", icon: AdvertisementsIcon(), url: "advertisements" },
    { title: "Настройки", icon: SettingsIcon({ size: "md" }), url: "settings" },
  ];
  switch (role) {
    case "gl_admin":
      return glAdminsNavDashboardData;
    case "sad_admin":
      return sadAdminsNavDashboardData;
    case "staff":
      return staffNavDashboardData;
    case "user":
      return userNavDashboardData;
  }
}
