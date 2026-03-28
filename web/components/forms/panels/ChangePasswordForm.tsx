import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import React, { useRef } from "react";
import { changePassword } from "@/components/forms/panels/action";
import { toast } from "sonner";

export default function ChangePasswordForm({ login }: { login: string }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const currPassword = data.currPass.toString();
    const newPassword = data.newPass.toString();
    const res = await changePassword({ data: { currPassword, newPassword } });
    if (res.ok) {
      toast.success("Пароль успешно изменен!");
      formRef.current?.reset();
    } else {
      toast.error(res.message);
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={"flex flex-col gap-3 flex-1 justify-center"}
    >
      <label
        htmlFor="currentPassId"
        className={"flex flex-col gap-1 text-sm font-medium"}
      >
        Текущий пароль
        <Input
          errorPack={{ isEnableError: false }}
          id={"currentPassId"}
          name={"currPass"}
          autoComplete={"current-password"}
          type={"password"}
          minLength={8}
        />
      </label>
      <label
        htmlFor="newPassId"
        className={"flex flex-col gap-1 text-sm font-medium"}
      >
        Новый пароль
        <Input
          errorPack={{ isEnableError: false }}
          id={"newPassId"}
          name={"newPass"}
          autoComplete={"new-password"}
          type={"password"}
          minLength={8}
        />
      </label>
      <input type="hidden" value={login} name={"login"} autoComplete={"name"} />

      <Button
        type="submit"
        className={
          "h-12 bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90" +
          " dark:hover:bg-primary-dark/90"
        }
      >
        Сменить пароль
      </Button>
    </form>
  );
}
