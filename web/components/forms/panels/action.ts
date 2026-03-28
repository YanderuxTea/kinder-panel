"use server";
import { cookies } from "next/headers";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";

export async function createKindergarten({
  data,
}: {
  data: { name: string; address: string };
}): Promise<
  { ok: false; message?: string } | { ok: true; kindergarten: Kindergartens }
> {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  if (data.name.trim().length === 0 || data.address.trim().length === 0) {
    return { ok: false, message: "Заполните все поля" };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/garden/create-kindergarten`,
    {
      method: "POST",
      body: JSON.stringify({
        token: token,
        address: data.address.trim(),
        name: data.name.trim(),
      }),
      headers: { "content-type": "application/json" },
    },
  );
  return (await res.json()) as
    | { ok: false }
    | { ok: true; kindergarten: Kindergartens };
}
export async function changePassword({
  data,
}: {
  data: { currPassword: string; newPassword: string };
}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  if (
    data.newPassword.trim().length === 0 ||
    data.newPassword.trim().length === 0
  ) {
    return { ok: false, message: "Заполните поля" };
  }
  if (
    data.newPassword.trim().length < 8 ||
    data.newPassword.trim().length < 8
  ) {
    return {
      ok: false,
      message: "Длина пароля не может быть меньше 8 символов",
    };
  }
  const req = await fetch(
    `${process.env.BACKEND_URL}/settings/change-password`,
    {
      method: "POST",
      body: JSON.stringify({
        currentPassword: data.currPassword,
        newPassword: data.newPassword,
        token: token,
      }),
      headers: { "content-type": "application/json" },
    },
  );
  const res: { ok: false; message: string } | { ok: true } = await req.json();
  return res;
}
