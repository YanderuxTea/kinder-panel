"use server";
import { cookies } from "next/headers";

export async function logoutUser() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token }),
  });
  const res: { ok: true } | { ok: false } = await req.json();
  if (res.ok) {
    cookieStorage.delete("token-kinder-panel");
    return res;
  } else {
    return res;
  }
}
export type Notifications = {
  id: string;
  isRead: boolean;
  createdAt: Date;
  author: {
    fullname: string;
  };
};
export async function getNotifications() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/notifications/get-notifications`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    },
  );
  const res: {
    data: { cursor: string; hasMore: boolean; data: Notifications[] };
  } = await req.json();
  return res;
}
export async function fetchMoreNotifications(cursor: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/notifications/fetch-more-notifications`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token, cursor: cursor }),
    },
  );
  const res: {
    data: { cursor: string; hasMore: boolean; data: Notifications[] };
  } = await req.json();
  return res;
}
export async function readNotification() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/notifications/read-notifications`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    },
  );
  const res: { ok: boolean } = await req.json();
  return res;
}
export async function deleteNotification() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(
    `${process.env.BACKEND_URL}/notifications/delete-notifications`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    },
  );
  const res: { ok: boolean } = await req.json();
  return res;
}
