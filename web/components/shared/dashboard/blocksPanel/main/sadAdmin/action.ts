"use server";
import { cookies } from "next/headers";
import { RolesType } from "@/proxy";
import { Attendance } from "@/hook/getAttendanceConfig";

export async function getKindergartens() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/garden/get-kindergartens`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    },
  );
  const res = await req.json();
  return res.data;
}
export type Accounts = {
  id: string;
  login: string;
  fullname: string;
  role: RolesType;
  group: {
    id: string;
    name: string;
  } | null;
};
export async function getAccounts() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/accounts/get-accounts`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const res: {
    data: { hasMore: boolean; cursor: string; accounts: Accounts[] };
  } = await req.json();
  return res;
}
export async function fetchMoreAccounts(cursor: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/accounts/fetch-more-accounts`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, cursor }),
    },
  );
  const res: {
    data: { hasMore: boolean; cursor: string; accounts: Accounts[] };
  } = await req.json();
  return res;
}
export type InformationSadAdmin = {
  id: string;
  name: string;
  _count: {
    childrens: number;
  };
  childrens: {
    attendances: {
      mark: Attendance;
    }[];
  }[];
};
export async function getInformationSadAdmin(id: string, date: Date) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/visits/get-kindergarten-information`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token, id, date }),
    },
  );
  const res: { data: InformationSadAdmin[] } = await req.json();
  return res;
}
