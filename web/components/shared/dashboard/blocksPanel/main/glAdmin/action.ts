"use server";
import { cookies } from "next/headers";

export async function getStatistics() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token-kinder-panel")?.value;
  const req = await fetch(`${process.env.BACKEND_URL}/garden/get-statistics`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: token }),
  });
  const res = await req.json();
  return res.data;
}
