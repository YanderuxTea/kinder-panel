import { Metadata } from "next";
import ResetPasswordForm from "@/components/forms/auth/ResetPasswordForm";
import Logo from "@/components/shared/Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Киндер | Сброс пароля",
  description:
    "Безопасный сброс пароля. Следуйте инструкциям на странице, чтобы восстановить доступ к вашей учетной записи.",
};
export default function ResetPasswordPage() {
  return (
    <main className={"flex flex-col items-center"}>
      <Logo isHideName={true} />
      <div
        className={
          "mb-8 mt-4 flex flex-col gap-2 text-center justify-center items-center"
        }
      >
        <h1
          className={
            "text-2xl font-bold text-foreground-light dark:text-foreground-dark"
          }
        >
          Сброс пароля
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          Восстановление доступа к аккаунту Киндер
        </p>
      </div>
      <ResetPasswordForm />
      <p
        className={
          "inline text-sm text-muted-light-foreground dark:text-muted-dark-foreground mt-6"
        }
      >
        Вспомнили пароль?{" "}
        <Link
          href={"/login"}
          className={
            "text-primary-light" + " dark:text-primary-dark hover:underline"
          }
        >
          Войти
        </Link>{" "}
      </p>
    </main>
  );
}
