"use server";
import { cookies } from "next/headers";

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
