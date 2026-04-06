"use server";
import { cookies } from "next/headers";

export type Children = {
  id: string;
  name: string;
  surname: string;
};

export async function getChildren() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/visits/get-children`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const res: { data: Children[] } = await req.json();
  return res;
}
export async function markedVisit(id: string, mark: string, reason: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/visits/marked-visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, id, reason, mark }),
  });
  const res: { ok: boolean } = await req.json();
  return res;
}
