import { AbsentIcon, CameIcon, SickIcon } from "@/components/icons";

const ATTENDANCE_MAP = (size: "md" | "lg") => ({
  came: {
    text: "Посещает",
    icon: CameIcon({ size: size }),
    color:
      "text-mint-light dark:text-mint-dark bg-mint-light-light dark:bg-mint-dark/20",
  },
  absent: {
    text: "Отсутствует",
    icon: AbsentIcon({ size: size }),
    color:
      "text-sunshine-light dark:text-sunshine-dark bg-sunshine-light-light dark:bg-sunshine-dark/20",
  },
  sick: {
    text: "Болен",
    icon: SickIcon({ size: size }),
    color:
      "text-coral-light dark:text-coral-dark bg-coral-light-light dark:bg-coral-dark/20",
  },
});
export type Attendance = "came" | "absent" | "sick";
export function getAttendanceConfig(attendance: Attendance, size: "md" | "lg") {
  return ATTENDANCE_MAP(size)[attendance];
}
