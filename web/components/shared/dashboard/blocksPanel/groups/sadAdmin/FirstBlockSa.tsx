import React, { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createGroup,
  Groups,
} from "@/components/shared/dashboard/panels/action";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import ModalSkeleton from "@/components/shared/ModalSkeleton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "sonner";

export default function FirstBlockSa({
  selectIdKindergarten,
  setSelectIdKindergarten,
  kindergartens,
  groups,
  setGroups,
}: {
  setGroups: Dispatch<SetStateAction<Groups[]>>;
  selectIdKindergarten: string;
  groups: Groups[];
  setSelectIdKindergarten: (value: string) => void;
  kindergartens: Kindergartens[];
}) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const nameGroup = data.name;
    const res = await createGroup(selectIdKindergarten, nameGroup as string);
    if (res.ok) {
      setOpenModal(false);
      toast.success("Успешно");
      setGroups((prevState) => [res.group, ...prevState]);
    } else {
      toast.error(res.message);
    }
  }
  return (
    <>
      <div
        className={
          "flex flex-row gap-3 w-full items-center select-none justify-between"
        }
      >
        <div
          className={
            "flex flex-col items-center gap-2 w-2/3 text-left lg:flex-row lg:w-full"
          }
        >
          <p
            className={
              "font-medium text-foreground-light dark:text-foreground-dark shrink-0 w-full lg:max-w-max"
            }
          >
            Выберите садик:
          </p>
          <div
            onClick={() => setOpenDropdown((prevState) => !prevState)}
            className={
              "min-h-10 bg-input-light/30 dark:bg-input-dark/30 border border-border-light" +
              " dark:border-border-dark rounded-full w-full p-3 flex items-center relative"
            }
          >
            {kindergartens.find(
              (kindergarten) => kindergarten.id === selectIdKindergarten,
            )?.name || "Выберите садик"}
            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={
                    "p-2" +
                    " bg-card-light dark:bg-input-dark absolute inset-x-0 bottom-0 border border-border-light" +
                    " dark:border-border-dark translate-y-full rounded-2xl flex flex-col select-none gap-2 z-10"
                  }
                >
                  {kindergartens.map((kindergarten) => {
                    return (
                      <div
                        key={kindergarten.id + "np"}
                        className={
                          "cursor-pointer p-3 border border-border-light dark:border-border-dark rounded-2xl"
                        }
                        onClick={() => setSelectIdKindergarten(kindergarten.id)}
                      >
                        {kindergarten.name}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {selectIdKindergarten.length > 0 && (
          <button
            onClick={() => setOpenModal(true)}
            className={
              "text-xs text-muted-light-foreground dark:text-muted-dark-foreground cursor-pointer transition-colors" +
              " duration-150 ease-in-out hover:text-primary-light dark:hover:text-primary-dark border p-1.25" +
              " rounded-lg shrink-0"
            }
          >
            Добавить группу
          </button>
        )}
      </div>
      <div
        className={`h-100 flex ${groups.length === 0 ? "justify-center items-center" : "flex-col py-3 gap-2"}`}
      >
        {groups.length === 0 ? (
          <p
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
            }
          >
            {selectIdKindergarten.length === 0
              ? "Выберите садик"
              : "В этом садике еще нет групп"}
          </p>
        ) : (
          groups.map((group) => {
            return (
              <div
                key={group.id}
                className={
                  "bg-input-light/30 dark:bg-input-dark/30 p-3 border border-border-light" +
                  " dark:border-border-dark rounded-2xl flex flex-row items-center justify-between gap-3"
                }
              >
                <p
                  className={
                    "text-foreground-light dark:text-foreground-dark font-medium"
                  }
                >
                  {group.name}
                </p>
                <p
                  className={
                    "text-sm text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
                  }
                >
                  Количество детей: {group._count.childrens}
                </p>
              </div>
            );
          })
        )}
      </div>
      <AnimatePresence>
        {openModal && (
          <ModalSkeleton setOpenModalAction={setOpenModal}>
            <div className={"flex flex-col gap-6"}>
              <div className={"flex flex-row justify-between items-center "}>
                <p
                  className={
                    "font-medium text-foreground-light dark:text-foreground-dark"
                  }
                >
                  Создание группы
                </p>
                <button
                  onClick={() => setOpenModal(false)}
                  className={
                    "cursor-pointer text-muted-light-foreground dark:text-muted-dark-foreground" +
                    " transition-colors duration-150 ease-in-out hover:text-destructive-light" +
                    " dark:hover:text-destructive-dark font-bold text-lg"
                  }
                >
                  X
                </button>
              </div>
              <form className={"flex flex-col gap-2"} onSubmit={handleSubmit}>
                <Input
                  style={{ height: 40 }}
                  placeholder={"Название садика"}
                  errorPack={{ isEnableError: false }}
                  id={"nameGroupId"}
                  name={"name"}
                  autoComplete={"off"}
                />
                <Button
                  type={"submit"}
                  className={
                    "bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90" +
                    " dark:hover:bg-primary-dark/90 h-10 text-primary-light-foreground" +
                    " dark:text-primary-dark-foreground font-medium"
                  }
                >
                  Создать
                </Button>
              </form>
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </>
  );
}
