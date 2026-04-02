import Button from "@/components/ui/Button";
import React, { Dispatch, SetStateAction, useRef } from "react";
import {
  Advertisement,
  createAdvertisements,
} from "@/components/forms/panels/action";
import { toast } from "sonner";

export default function CreateAdvertisementsForm({
  setAdvertisements,
}: {
  setAdvertisements: Dispatch<SetStateAction<Advertisement[]>>;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const text = data.text.toString().trim();
    const res = await createAdvertisements(text);
    if (res.ok) {
      toast.success("Успешно");
      setAdvertisements((prevState) => [res.data, ...prevState]);
      formRef.current?.reset();
    } else {
      toast.error(res.message);
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={"flex flex-row justify-between gap-2 items-center"}
    >
      <textarea
        placeholder={"Напишите объявление..."}
        name={"text"}
        autoComplete={"off"}
        id={"text-id"}
        className={
          "w-full resize-none border rounded-2xl h-20 border-border-light dark:border-border-dark outline-none" +
          " focus:border-primary-light dark:focus:border-primary-dark transition-all duration-150 ease-in-out" +
          " focus:ring-3 ring-primary-light/30 dark:ring-primary-dark/30 p-3"
        }
      />
      <Button
        type={"submit"}
        className={
          "bg-primary-light dark:bg-primary-dark text-primary-light-foreground dark:text-primary-dark-foreground" +
          " font-medium p-2 shrink-0 hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
        }
      >
        Отправить
      </Button>
    </form>
  );
}
