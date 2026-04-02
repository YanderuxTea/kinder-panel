"use server";
import { cookies } from "next/headers";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import { Accounts } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";

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
export async function changeSubscription(newDate: Date, id: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/admin-panel/change-subscriptions`,
    {
      method: "POST",
      body: JSON.stringify({ token: token, id: id, newDate: newDate }),
      headers: { "content-type": "application/json" },
    },
  );
  const res: { ok: boolean } = await req.json();
  return res;
}
export async function createAccount(
  login: string,
  fullname: string,
  email: string,
  password: string,
  role: string,
  kindergartenId: string,
  selectGroupId: string,
): Promise<{ ok: true; data: Accounts } | { ok: false; message: string }> {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  if (
    login.trim().length === 0 ||
    fullname.trim().length === 0 ||
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    kindergartenId.trim().length === 0
  ) {
    return { ok: false, message: "Заполните все поля" };
  }
  const splitFullName = fullname.trim().split(/\s+/);
  if (splitFullName.length !== 2) {
    return {
      ok: false,
      message: 'Полное имя вводить по примеру "Иван Смирнов"',
    };
  }
  if (password.trim().length < 8) {
    return { ok: false, message: "Пароль не может быть меньше 8 символов" };
  }
  if (login.trim().length < 5 || login.trim().length > 12) {
    return {
      ok: false,
      message: "Логин не может быть меньше 5 символов и больше 12",
    };
  }
  const req = await fetch(
    `${process.env.BACKEND_URL}/accounts/create-account`,
    {
      method: "POST",
      body: JSON.stringify({
        token: token,
        login: login.trim(),
        fullname: fullname.trim(),
        email: email.trim(),
        password: password.trim(),
        role: role,
        id: kindergartenId,
        groupId: selectGroupId,
      }),
      headers: { "content-type": "application/json" },
    },
  );
  return await req.json();
}
export async function deleteAccountFunc(id: string): Promise<{ ok: boolean }> {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/accounts/delete-account`,
    {
      method: "POST",
      body: JSON.stringify({ token, id }),
      headers: { "content-type": "application/json" },
    },
  );
  return await req.json();
}
export type Advertisement = {
  id: string;
  createdAt: Date;
  text: string;
  author: {
    fullname: string;
    group: {
      name: string;
    } | null;
  };
};
export async function createAdvertisements(text: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  if (text.length === 0) {
    return { ok: false, message: "Напишите объявление" };
  }
  const req = await fetch(
    `${process.env.BACKEND_URL}/advertisements/create-advertisement`,
    {
      method: "POST",
      body: JSON.stringify({ token: token, text: text }),
      headers: { "content-type": "application/json" },
    },
  );
  const res:
    | { ok: true; data: Advertisement }
    | { ok: false; message: string } = await req.json();
  return res;
}
