"use client";
import Button from "@/components/ui/Button";
import { logoutUser } from "@/components/shared/dashboard/action";
import { useRouter } from "next/navigation";

export default function WaitPage() {
  const router = useRouter();
  return (
    <main className={"w-full min-h-screen flex justify-center items-center "}>
      <div
        className={
          "p-6 border border-border-light dark:border-border-dark rounded-2xl bg-card-light dark:bg-card-dark" +
          " text-center flex flex-col gap-2"
        }
      >
        <h1
          className={
            "text-2xl lg:text-3xl font-bold text-foreground-light dark:text-foreground-dark"
          }
        >
          Подписка просрочена
        </h1>
        <p
          className={
            "text-lg font-medium text-foreground-light dark:text-foreground-dark"
          }
        >
          Обратитесь к администратору садика
        </p>
        <Button
          onClick={() => logoutUser().then(() => router.push("/login"))}
          className={
            "bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90" +
            " dark:hover:bg-primary-dark/90 text-primary-light-foreground dark:text-primary-dark-foreground" +
            " font-medium py-2"
          }
        >
          Выйти из аккаунта
        </Button>
      </div>
    </main>
  );
}
