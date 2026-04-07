"use server";
import { cookies } from "next/headers";
import { Attendance } from "@/hook/getAttendanceConfig";

export type ChildrenStaff = {
  id: string;
  name: string;
  surname: string;
  attendances: {
    mark: Attendance;
    createdAt: Date;
    reason: string | null;
  }[];
};
export async function getChildrenStaff() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/visits/get-children-staff`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );
  const res: { data: ChildrenStaff[] } = await req.json();
  return res;
}
