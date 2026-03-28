import { ReactNode } from "react";
import {
  BellIcon,
  CalendarIcon,
  NutritionIcon,
  ShieldIcon,
} from "@/components/icons";

type CardData = {
  icon: ReactNode;
  title: string;
  description: string;
  colorIcon: string;
  colorBadge: string;
};
export const featuresCardData: CardData[] = [
  {
    icon: ShieldIcon(),
    title: "Безопасность прежде всего",
    description:
      "Отслеживание входа/выхода в реальном времени с мгновенными уведомлениями родителям. Всегда знайте, что ваш ребенок в безопасности.",
    colorIcon: "text-mint-light dark:text-mint-dark",
    colorBadge: "bg-mint-light-light dark:bg-mint-dark/20",
  },
  {
    icon: NutritionIcon(),
    title: "Отслеживание питания",
    description:
      "Полные расписания приема пищи, диетические требования и информация о питании. Родители всегда знают, что ест их ребенок.",
    colorIcon: "text-sunshine-light dark:text-sunshine-dark",
    colorBadge: "bg-sunshine-light-light dark:bg-sunshine-dark/20",
  },
  {
    icon: BellIcon(),
    title: "Мгновенные объявления",
    description:
      "Важные обновления, напоминания о событиях и экстренные уведомления, доставляемые мгновенно всем родителям.",
    colorIcon: "text-coral-light dark:text-coral-dark",
    colorBadge: "bg-coral-light-light dark:bg-coral-dark/20",
  },
  {
    icon: CalendarIcon(),
    title: "Управление посещаемостью",
    description:
      "Простая отчетность об отсутствии, планирование праздников и история посещаемости. Никогда не пропустите день без уведомления.",
    colorIcon: "text-mint-light dark:text-mint-dark",
    colorBadge: "bg-mint-light-light dark:bg-mint-dark/20",
  },
];
