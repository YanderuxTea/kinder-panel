"use server";
import { cookies } from "next/headers";

type StatusAttendance = "came" | "absent" | "sick";
export type Children = {
  id: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  group: {
    name: string;
  };
  attendances: {
    mark: StatusAttendance;
    createdAt: Date;
  }[];
};
export async function getChildren() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/user-main/get-children`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const res: { data: Children[] } = await req.json();
  return res;
}
export type NutritionUser = {
  dayWeek: number;
  breakfast: string;
  secondBreakfast: string;
  lunch: string;
  afternoonSnack: string;
  breakfastTime: string;
  secondBreakfastTime: string;
  lunchTime: string;
  afternoonSnackTime: string;
};
export async function getNutrition() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/user-main/get-nutrition`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );
  const res: { data: NutritionUser | null } = await req.json();
  return res;
}
