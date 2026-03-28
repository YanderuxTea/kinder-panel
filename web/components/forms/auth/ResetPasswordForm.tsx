"use client";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import {
  ArrowIcon,
  CloseEyeIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PeopleIcon,
} from "@/components/icons";
import { resetPassword } from "@/app/(auth)/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ResetPasswordObj = {
  login: string;
  code: string;
  newPassword: string;
};
export default function ResetPasswordForm() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [resetPasswordObj, setResetPasswordObj] = useState<ResetPasswordObj>({
    login: "",
    code: "",
    newPassword: "",
  });
  const router = useRouter();
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await resetPassword({ data: resetPasswordObj, step: step });
    if (res.ok && step === 0) {
      toast.success(`На вашу почту ${res.email} отправлен код подтверждения`);
      setStep(1);
    } else if (!res.ok && step === 0) {
      if (res.status) {
        toast.error("Слишком много попыток. Попробуйте позднее");
        return;
      }
      toast.error("Учетной записи с таким логином нет");
      return;
    }
    if (res.ok && step === 1) {
      setStep(2);
    } else if (!res.ok && step === 1) {
      if (res.status === 429) {
        toast.error("Слишком много попыток. Попробуйте позднее");
        return;
      } else if (res.status === 500) {
        toast.error("Неизвестная ошибка. Попробуйте позже");
        return;
      }
      toast.error("Код недействительный");
    }
    if (res.ok && step === 2) {
      router.replace("/login");
      toast.success("Пароль успешно изменен");
    } else if (res.ok && step === 2) {
      if (res.status === 429) {
        toast.error("Слишком много попыток. Попробуйте позднее");
      } else {
        toast.error("Неизвестная ошибка");
      }
    }
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={"flex flex-col w-full gap-4"}
    >
      <AnimatePresence mode={"wait"}>
        {step === 0 && (
          <motion.div key={"1step"} exit={{ x: "-120%", scaleY: 0.8 }}>
            <Input
              id={"reset-password-login"}
              value={resetPasswordObj.login}
              onChange={(e) =>
                setResetPasswordObj((prevState) => {
                  return {
                    ...prevState,
                    login: e.target.value,
                  };
                })
              }
              errorPack={{ isEnableError: false }}
              autoComplete={"name"}
              name={"login"}
              type={"text"}
              placeholder={"Логин"}
              maxLength={12}
              minLength={5}
              iconLeft={<PeopleIcon size={"sm"} />}
            />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key={"2step"}
            initial={{ x: "120%", scaleY: 0.8 }}
            animate={{ x: "0", scaleY: 1 }}
            exit={{ x: "-120%", scaleY: 0.8 }}
          >
            <Input
              value={resetPasswordObj.code}
              id={"reset-password-code"}
              onChange={(e) =>
                setResetPasswordObj((prevState) => {
                  return {
                    ...prevState,
                    code: e.target.value,
                  };
                })
              }
              errorPack={{ isEnableError: false }}
              type={"tel"}
              name={"code"}
              maxLength={6}
              minLength={6}
              iconLeft={<MailIcon />}
              placeholder={"Код подтверждения"}
            />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key={"3step"}
            initial={{ x: "120%", scaleY: 0.8 }}
            animate={{ x: "0", scaleY: 1 }}
            exit={{ x: "-120%", scaleY: 0.8 }}
          >
            <input type="hidden" name={"name"} value={resetPasswordObj.login} />
            <Input
              id={"reset-password-password"}
              value={resetPasswordObj.newPassword}
              onChange={(e) =>
                setResetPasswordObj((prevState) => {
                  return {
                    ...prevState,
                    newPassword: e.target.value,
                  };
                })
              }
              errorPack={{ isEnableError: false }}
              placeholder={"Новый пароль"}
              autoComplete={"new-password"}
              name={"password"}
              minLength={8}
              type={visiblePassword ? "text" : "password"}
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
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        iconRight={<ArrowIcon />}
        type={"submit"}
        className={
          "bg-primary-light dark:bg-primary-dark h-12 text-primary-light-foreground" +
          " dark:text-primary-dark-foreground font-medium hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
        }
      >
        {step === 2 ? "Сменить" : "Продолжить"}
      </Button>
    </form>
  );
}
