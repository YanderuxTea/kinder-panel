"use server";
import { cookies } from "next/headers";

export type Parent = {
  id: string;
  email: string;
  login: string;
  fullname: string;
  address: string | null;
  tel: string | null;
};
export type Information = {
  name: string;
  childrens: {
    name: string;
    surname: string;
    dateOfBirth: Date;
    id: string;
    parents: Parent[];
  }[];
  _count: {
    childrens: number;
  };
};
export async function getInformation() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/staff-main/get-information`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );
  const res: { data: Information } = await req.json();
  return res;
}
