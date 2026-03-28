"use server";

import { ResetPasswordObj } from "@/components/forms/auth/ResetPasswordForm";
import { cookies } from "next/headers";

type RegisterUser = {
  fullName: string;
  email: string;
  password: string;
  login: string;
};
export async function registerUser({ data }: { data: RegisterUser }) {
  const req = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await req.json();
}
export async function resetPassword({
  data,
  step,
}: {
  data: ResetPasswordObj;
  step: 0 | 1 | 2;
}) {
  if (step === 0) {
    if (data.login.trim().length < 5 || data.login.trim().length > 12) {
      return { ok: false };
    }
    const req = await fetch(`${process.env.BACKEND_URL}/auth/first-step`, {
      method: "POST",
      body: JSON.stringify({ login: data.login.trim() }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    if (res.ok) {
      // const testAccount = await nodemailer.createTestAccount();
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   secure: false,
      //   auth: {
      //     user: testAccount.user,
      //     pass: testAccount.pass,
      //   },
      // });
      // const info = await transporter.sendMail({
      //   from: '"Киндер" <no-reply@kinder.com>',
      //   to: res.email,
      //   subject: "Сброс пароля",
      //   text: `Ваш код подтверждения для сброса пароля: ${res.code}`,
      // });
      // const url = nodemailer.getTestMessageUrl(info);
      // console.log(`Тестовое письмо: ${url}`);
      console.log(`Код подтверждения: ${res.code}`);
      return { ok: true, email: res.email };
    } else {
      if (res.status === 429) {
        return { ok: false, status: 429 };
      } else {
        return { ok: false };
      }
    }
  }
  if (step === 1) {
    if (data.code.trim().length < 6) {
      return { ok: false };
    }
    const req = await fetch(`${process.env.BACKEND_URL}/auth/second-step`, {
      method: "POST",
      body: JSON.stringify({
        login: data.login.trim(),
        code: data.code.trim(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    if (res.ok) {
      return { ok: true };
    } else {
      if (res.status) {
        return { ok: false, status: res.status };
      } else {
        return { ok: false };
      }
    }
  }
  if (step === 2) {
    if (data.newPassword.trim().length < 8) {
      return { ok: false };
    }
    const req = await fetch(`${process.env.BACKEND_URL}/auth/third-step`, {
      method: "POST",
      body: JSON.stringify({
        login: data.login.trim(),
        password: data.newPassword.trim(),
        code: data.code.trim(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    if (res.ok) {
      return { ok: true };
    } else {
      if (res.status === 429) {
        return { ok: false, status: 429 };
      } else {
        return { ok: false };
      }
    }
  }
  return { ok: false };
}
export async function authenticate({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  if (
    login.trim().length < 5 ||
    login.trim().length > 12 ||
    password.trim().length < 8
  ) {
    return { ok: false };
  }
  const req = await fetch(`${process.env.BACKEND_URL}/auth/authenticate`, {
    method: "POST",
    body: JSON.stringify({ login: login.trim(), password: password.trim() }),
    headers: { "Content-Type": "application/json" },
  });
  const res = await req.json();
  if (res.ok) {
    const cookieStorage = await cookies();
    cookieStorage.set("token-kinder-panel", res.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });
  }
  return res;
}
