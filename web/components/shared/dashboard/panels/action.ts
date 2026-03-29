"use server";
import { cookies } from "next/headers";
import { Query } from "@/components/shared/dashboard/panels/AdminPanel";

export async function getDataForSettings() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/settings/get-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token }),
  });
  return await req.json();
}
export type DataSettingsType = {
  fullname: string;
  email: string;
  tel: string;
  address: string;
};
export async function changeDataForSettings({
  data,
}: {
  data: DataSettingsType;
}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/settings/change-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullname: data.fullname,
      email: data.email,
      tel: data.tel,
      address: data.address,
      token: token,
    }),
  });
  return await req.json();
}
export type Kindergartens = {
  id: string;
  owner: { fullname: string; login: string };
  name: string;
  address: string;
  endSubscription: Date;
};
export async function fetchKindergartens() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/fetch-kindergartens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    },
  );
  const res: {
    data: { kindergartens: Kindergartens[]; cursor: string; hasMore: boolean };
  } = await req.json();
  return res;
}
export async function fetchMoreKindergartens(cursor: string, query: Query) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/fetch-more-kindergartens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cursor: cursor,
        token: token,
        userLogin: query.userLogin.trim(),
        nameKindergarten: query.nameKindergarten.trim(),
      }),
    },
  );
  const res: {
    data: { kindergartens: Kindergartens[]; cursor: string; hasMore: boolean };
  } = await req.json();
  return res;
}
export async function searchKindergartens(query: Query) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/search-kindergartens`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        nameKindergartens: query.nameKindergarten.trim(),
        userLogin: query.userLogin.trim(),
      }),
    },
  );
  const res: {
    data: { kindergartens: Kindergartens[]; cursor: string; hasMore: boolean };
  } = await req.json();
  return res;
}
