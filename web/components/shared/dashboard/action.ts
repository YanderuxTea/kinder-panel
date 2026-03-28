"use server";
import { cookies } from "next/headers";

export async function logoutUser() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  console.log(token);
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
