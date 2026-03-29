import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Kindergartens } from "@/components/shared/dashboard/panels/action";
import { changeSubscription } from "@/components/forms/panels/action";

export default function ChangeSubscribeForm({
  currentEndSub,
  id,
  setKindergartens,
  setOpenModal,
}: {
  setOpenModal: (setOpenModal: boolean) => void;
  id: string;
  setKindergartens: Dispatch<SetStateAction<Kindergartens[]>>;
  currentEndSub: Date;
}) {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const newDate = new Date((data.dateInput as string) || "");
    if (newDate.setHours(0, 0, 0, 0) === currentEndSub.setHours(0, 0, 0, 0)) {
      toast.error("Поменяйте дату");
      return;
    }
    const res = await changeSubscription(newDate, id);
    if (res.ok) {
      toast.success("Успешно");
      setKindergartens((prevState) =>
        prevState.map((val) => {
          if (val.id === id) {
            return {
              ...val,
              endSubscription: newDate,
            };
          }
          return val;
        }),
      );
      setOpenModal(false);
    } else {
      toast.error("Произошла неизвестная ошибка");
    }
  }
  const [price, setPrice] = useState<number>(0);
  function checkPrice(value: string) {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const currDateSub = new Date(currentEndSub).setHours(0, 0, 0, 0);
    const newDateSub = new Date(value).setHours(0, 0, 0, 0);
    const oneDay = 1000 * 60 * 60 * 24;
    const diff =
      currentDate > currDateSub
        ? Math.ceil((newDateSub - currentDate) / oneDay)
        : Math.ceil((newDateSub - currDateSub) / oneDay);
    const priceOneDay = 165;
    setPrice(diff * priceOneDay);
  }
  return (
    <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
      {price === 0 ? null : (
        <p
          className={
            "text-foreground-light dark:text-foreground-dark font-medium underline underline-offset-3"
          }
        >
          Стоимость продления: {price} ₽
        </p>
      )}
      <Input
        onChange={(e) => checkPrice(e.target.value)}
        errorPack={{ isEnableError: false }}
        type={"date"}
        id={"dateInputId"}
        name={"dateInput"}
        min={currentEndSub.toISOString().split("T")[0]}
        defaultValue={currentEndSub.toISOString().split("T")[0]}
      />
      <Button
        type={"submit"}
        className={
          "bg-primary-light dark:bg-primary-dark text-primary-light-foreground" +
          " dark:text-primary-dark-foreground hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 h-12 font-medium"
        }
      >
        Продлить
      </Button>
    </form>
  );
}
