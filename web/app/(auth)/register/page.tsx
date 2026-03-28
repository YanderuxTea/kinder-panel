import { Metadata } from "next";
import Logo from "@/components/shared/Logo";
import RegisterForm from "@/components/forms/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Киндер | Регистрация",
  description:
    "Вход в Kinder — получайте обновления в реальном времени, следите за активностью ребёнка и общайтесь с воспитателями.",
};
export default function RegisterPage() {
  return (
    <main className={"flex flex-col text-center"}>
      <div className={"flex flex-col justify-center items-center mb-8"}>
        <Logo isHideName={true} />
        <h1
          className={
            "text-2xl font-bold text-foreground-light dark:text-foreground-dark mt-4"
          }
        >
          Создать аккаунт
        </h1>
        <p
          className={
            "mt-2 text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          Присоединитесь к Киндер и оставайтесь на связи
        </p>
      </div>
      <RegisterForm />
      <p
        className={
          "inline-block mt-6 text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
        }
      >
        Уже есть аккаунт?{" "}
        <Link
          href={"/login"}
          className={
            "text-primary-light dark:text-primary-dark" +
            " hover:underline font-medium"
          }
        >
          Войти
        </Link>{" "}
      </p>
      <div className={"pointer-events-none absolute inset-0 overflow-hidden"}>
        <div
          className={
            "absolute -top-40 -left-40 h-80 w-80 rounded-full bg-sunshine-light-light/30" +
            " dark:bg-sunshine-dark/10 blur-3xl"
          }
        ></div>
        <div
          className={
            "absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-mint-light-light/40" +
            " dark:bg-mint-dark/10 blur-3xl"
          }
        ></div>
      </div>
    </main>
  );
}
