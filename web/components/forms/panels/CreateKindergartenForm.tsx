import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import React, { Dispatch, SetStateAction } from "react";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import { createKindergarten } from "@/components/forms/panels/action";
import { toast } from "sonner";

export default function CreateKindergartenForm({
  setKindergartens,
  setOpenModal,
}: {
  setKindergartens: Dispatch<SetStateAction<Kindergartens[]>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await createKindergarten({
      data: { name: data.name as string, address: data.address as string },
    });
    if (res.ok) {
      setKindergartens((prevState) => [res.kindergarten, ...prevState]);
      setOpenModal(false);
    } else {
      toast.error(
        res.message ? res.message : "Название садика или адрес уже заняты",
      );
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={"flex flex-col gap-3"}>
      <Input
        errorPack={{ isEnableError: false }}
        placeholder={"Название садика"}
        id={"nameKindergarten"}
        autoComplete={"off"}
        name={"name"}
      />
      <Input
        errorPack={{ isEnableError: false }}
        placeholder={"Адрес садика"}
        id={"addressKindergarten"}
        autoComplete={"off"}
        name={"address"}
      />
      <Button
        type="submit"
        className={
          "bg-primary-light dark:bg-primary-dark h-12 text-primary-light-foreground" +
          " dark:text-primary-dark-foreground font-medium hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
        }
      >
        Создать
      </Button>
    </form>
  );
}
