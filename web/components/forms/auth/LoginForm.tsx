"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  ArrowIcon,
  CloseEyeIcon,
  EyeIcon,
  LockIcon,
  PeopleIcon,
} from "@/components/icons";
import React, { useState } from "react";
import Link from "next/link";
import { authenticate } from "@/app/(auth)/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await authenticate({
      login: data.login.toString(),
      password: data.password.toString(),
    });
    if (res.ok) {
      router.replace("/dashboard/main");
    } else {
      if (res.status === 429) {
        toast.error("Слишком много запросов. Повторите позднее");
        return;
      }
      toast.error("Неверный логин или пароль");
    }
  }
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={"flex flex-col w-full gap-4"}
    >
      <Input
        name={"login"}
        id={"login-form-login"}
        iconLeft={<PeopleIcon size={"sm"} />}
        placeholder={"Логин"}
        errorPack={{ isEnableError: false }}
        autoComplete={"name"}
      />
      <div className={"flex flex-col w-full gap-1 items-end"}>
        <Link
          href={"/reset-password"}
          className={
            "text-sm text-primary-light dark:text-primary-dark" +
            " hover:underline max-w-max"
          }
        >
          Забыли пароль?
        </Link>
        <div className={"w-full"}>
          <Input
            name={"password"}
            id={"login-form-password"}
            iconLeft={<LockIcon />}
            placeholder={"Пароль"}
            errorPack={{ isEnableError: false }}
            minLength={8}
            type={visiblePassword ? "text" : "password"}
            iconRight={
              <button
                type={"button"}
                className={
                  "text-muted-light-foreground dark:text-muted-dark-foreground" +
                  " hover:text-foreground-light dark:hover:text-foreground-dark transition-colors duration-150 ease-in-out "
                }
                onClick={() => setVisiblePassword((prevState) => !prevState)}
              >
                {visiblePassword ? <CloseEyeIcon /> : <EyeIcon />}
              </button>
            }
          />
        </div>
      </div>
      <Button
        type={"submit"}
        className={
          "bg-primary-light dark:bg-primary-dark h-12 text-primary-light-foreground" +
          " dark:text-primary-dark-foreground font-medium hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
        }
        iconRight={<ArrowIcon />}
      >
        Войти
      </Button>
    </form>
  );
}
