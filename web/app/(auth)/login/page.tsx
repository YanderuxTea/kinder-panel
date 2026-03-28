import { Metadata } from "next";
import Logo from "@/components/shared/Logo";
import LoginForm from "@/components/forms/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Киндер | Вход",
  description:
    "Войдите в аккаунт Kinder, чтобы отслеживать день ребенка, получать обновления и оставаться на связи с детским" +
    " садом.",
};
export default function LoginPage() {
  return (
    <main className={"flex flex-col items-center text-center"}>
      <div className={"flex flex-col justify-center items-center mb-8"}>
        <Logo isHideName={true} />
        <h1
          className={
            "text-2xl font-bold text-foreground-light dark:text-foreground-dark mt-4"
          }
        >
          С возвращением
        </h1>
        <p
          className={
            "mt-2 text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          Войдите в свой аккаунт Киндер
        </p>
      </div>
      <LoginForm />
      <p
        className={
          "inline-block mt-6 text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
        }
      >
        Нет аккаунта?{" "}
        <Link
          href={"/register"}
          className={
            "text-primary-light dark:text-primary-dark" +
            " hover:underline font-medium"
          }
        >
          Зарегистрируйтесь бесплатно
        </Link>{" "}
      </p>
      <div className={"absolute pointer-events-none inset-0 overflow-hidden"}>
        <div
          className={
            "absolute -top-40 -right-40 h-80 w-80 rounded-full bg-mint-light-light/40" +
            " dark:bg-mint-dark/10 blur-3xl"
          }
        ></div>
        <div
          className={
            "absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-sky-light-light/40" +
            " dark:bg-sky-dark/10 blur-3xl"
          }
        ></div>
      </div>
    </main>
  );
}
