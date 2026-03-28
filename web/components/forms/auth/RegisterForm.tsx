"use client";
import Input from "@/components/ui/Input";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import {
  ArrowIcon,
  CloseEyeIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PeopleIcon,
} from "@/components/icons";
import ErrorValidation from "@/components/shared/ErrorValidation";
import { registerUser } from "@/app/(auth)/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Errors = {
  fullName: boolean;
  login: boolean;
  password: boolean;
  email: boolean;
};
export default function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({
    fullName: false,
    email: false,
    login: false,
    password: false,
  });
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const fullName = data.fullName.toString();
    const email = data.email.toString();
    const password = data.password.toString();
    const login = data.login.toString();
    const check = {
      fullName: !fullName || fullName.trim().split(" ").length !== 2,
      email: !email,
      password: !password || password.trim().length < 8,
      login: !login || login.trim().length < 5 || login.trim().length > 12,
    };
    if (Object.values(check).some(Boolean)) {
      setErrors(check);
      return;
    }
    const safeData = {
      fullName: fullName.trim(),
      email: email.trim(),
      login: login.trim(),
      password: password.trim(),
    };
    registerUser({ data: safeData }).then((res) => {
      if (res.ok) {
        toast.success("Успешно");
        router.push("/login");
      } else {
        toast.error("Логин или почта уже используются");
      }
    });
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={"flex flex-col gap-4 text-left"}
    >
      <div className="flex flex-col gap-2">
        <Input<Errors>
          errorPack={{
            isEnableError: true,
            isError: errors,
            setIsError: setErrors,
            keyInput: "fullName",
          }}
          name={"fullName"}
          placeholder={"Иван Смирнов"}
          id={"fullName"}
          iconLeft={<PeopleIcon size={"sm"} />}
        />

        {errors.fullName && (
          <ErrorValidation>
            Полное имя обязательно. Например Иван Смирнов
          </ErrorValidation>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input<Errors>
          errorPack={{
            isEnableError: true,
            isError: errors,
            setIsError: setErrors,
            keyInput: "login",
          }}
          name={"login"}
          autoComplete={"name"}
          placeholder={"Логин"}
          id={"login"}
          maxLength={12}
          iconLeft={<PeopleIcon size={"sm"} />}
        />
        {errors.login && (
          <ErrorValidation>
            Логин обязателен. От 5 до 12 символов
          </ErrorValidation>
        )}
      </div>
      <div className={"flex flex-col gap-2"}>
        <Input<Errors>
          errorPack={{
            isEnableError: true,
            isError: errors,
            setIsError: setErrors,
            keyInput: "email",
          }}
          name={"email"}
          type={"email"}
          placeholder={"Почта"}
          id={"email"}
          autoComplete={"email"}
          iconLeft={<MailIcon />}
        />
        {errors.email && (
          <ErrorValidation>Адрес электронной почты обязателен</ErrorValidation>
        )}
      </div>
      <div className={"flex flex-col gap-2"}>
        <Input<Errors>
          errorPack={{
            isEnableError: true,
            isError: errors,
            setIsError: setErrors,
            keyInput: "password",
          }}
          autoComplete={"new-password"}
          name={"password"}
          type={visiblePassword ? "text" : "password"}
          placeholder={"Пароль"}
          id={"password"}
          iconLeft={<LockIcon />}
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
        {errors.password && (
          <ErrorValidation>Пароль обязателен. От 8 символов</ErrorValidation>
        )}
      </div>
      <Button
        type="submit"
        iconRight={<ArrowIcon />}
        className={
          "bg-primary-light dark:bg-primary-dark h-12 text-primary-light-foreground" +
          " dark:text-primary-dark-foreground font-medium hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
        }
      >
        Создать аккаунт
      </Button>
    </form>
  );
}
