"use client";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  createChild,
  Groups,
} from "@/components/shared/dashboard/panels/action";
import { AnimatePresence, motion } from "framer-motion";
import ModalSkeleton from "@/components/shared/ModalSkeleton";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { PeopleIcon, UsersIcon } from "@/components/icons";
import { toast } from "sonner";

export default function SecondBlockSA({
  selectIdKindergarten,
  groups,
  setGroups,
}: {
  setGroups: Dispatch<SetStateAction<Groups[]>>;
  groups: Groups[];
  selectIdKindergarten: string;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectGroupId, setSelectGroupId] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const childArray = useMemo(() => {
    return groups.flatMap((group) => group.childrens);
  }, [groups]);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataRaw = Object.fromEntries(formData.entries());
    const loginsParents = dataRaw.loginsParents.toString().split(",");
    const birthdate = new Date(dataRaw.birthdate.toString());
    const name = dataRaw.name.toString();
    const surname = dataRaw.surname.toString();
    const data = {
      name: name,
      surname: surname,
      birthdate: birthdate,
      loginsParents: loginsParents,
      idSelectGroup: selectGroupId,
    };
    const res = await createChild(data);
    if (res.ok) {
      toast.success("Успешно");
      setOpenModal(false);
      setGroups((prevState) => {
        return prevState.map((group) => {
          if (group.id === selectGroupId) {
            return {
              ...group,
              childrens: [res.data, ...group.childrens],
            };
          }
          return group;
        });
      });
    } else {
      toast.error(res.message);
    }
  }
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className={"flex flex-col gap-6"}>
      <div className={"flex flex-row justify-between items-center gap-3"}>
        <p
          className={
            "text-lg font-medium text-foreground-light dark:text-foreground-dark"
          }
        >
          Дети
        </p>

        {selectIdKindergarten.length > 0 && (
          <button
            onClick={() => setOpenModal(true)}
            className={
              "text-xs text-muted-light-foreground dark:text-muted-dark-foreground cursor-pointer transition-colors" +
              " duration-150 ease-in-out hover:text-primary-light dark:hover:text-primary-dark border p-1.25" +
              " rounded-lg shrink-0"
            }
          >
            Создать аккаунт
          </button>
        )}
      </div>
      <div
        className={`h-100 flex ${
          selectIdKindergarten.length > 0 && childArray.length > 0
            ? "flex-col"
            : "justify-center" + " items-center"
        }`}
      >
        {selectIdKindergarten.length > 0 ? (
          childArray.length > 0 ? (
            childArray.map((child) => {
              return (
                <div
                  key={child.id}
                  className={
                    "border border-border-light dark:border-border-dark p-3 rounded-2xl bg-input-light/30" +
                    " dark:bg-input-dark/30 flex flex-row justify-between items-center font-medium gap-3"
                  }
                >
                  <div className={"flex flex-col gap-1"}>
                    <p
                      className={
                        "text-foreground-light dark:text-foreground-dark"
                      }
                    >
                      {child.name} {child.surname}
                    </p>
                    <p
                      className={
                        "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
                      }
                    >
                      День рождения:{" "}
                      {formatter.format(new Date(child.dateOfBirth))}
                    </p>
                  </div>
                  <p
                    className={
                      "text-foreground-light dark:text-foreground-dark"
                    }
                  >
                    Группа: {child.group.name}
                  </p>
                </div>
              );
            })
          ) : (
            <p
              className={
                "text-muted-light-foreground" +
                " dark:text-muted-dark-foreground font-medium"
              }
            >
              Детей нет
            </p>
          )
        ) : (
          <p
            className={
              "text-muted-light-foreground" +
              " dark:text-muted-dark-foreground font-medium"
            }
          >
            Выберите садик
          </p>
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
                  Создание аккаунта ребенка
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
              <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
                <Input
                  errorPack={{ isEnableError: false }}
                  placeholder={"Имя"}
                  name={"name"}
                  id={"nameId"}
                  autoComplete={"off"}
                  iconLeft={<PeopleIcon size={"sm"} />}
                />
                <Input
                  errorPack={{ isEnableError: false }}
                  placeholder={"Фамилия"}
                  name={"surname"}
                  id={"surnameId"}
                  autoComplete={"off"}
                  iconLeft={<PeopleIcon size={"sm"} />}
                />
                <Input
                  errorPack={{ isEnableError: false }}
                  placeholder={"Дата"}
                  name={"birthdate"}
                  id={"dateId"}
                  autoComplete={"off"}
                  type={"date"}
                />
                <Input
                  errorPack={{ isEnableError: false }}
                  placeholder={"Логин(ы) родителя(-ей) log | log1,log2"}
                  name={"loginsParents"}
                  id={"parentsId"}
                  autoComplete={"off"}
                  iconLeft={<UsersIcon size={"sm"} />}
                />
                <div
                  onClick={() => setOpenDropdown((prevState) => !prevState)}
                  className={
                    "flex items-center p-3 border h-12 rounded-3xl border-border-light" +
                    " dark:border-border-dark bg-input-light/30 dark:bg-input-dark/30 text-sm font-medium" +
                    " text-foreground-light dark:text-foreground-dark relative select-none"
                  }
                >
                  {selectGroupId.length > 0 ? (
                    <p>
                      {groups.find((group) => group.id === selectGroupId)?.name}
                    </p>
                  ) : (
                    <p>Выберите группу</p>
                  )}
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
                        {groups.length > 0 ? (
                          groups.map((group) => {
                            return (
                              <div
                                key={`dropdown${group.id}`}
                                className={
                                  "cursor-pointer p-3 border border-border-light dark:border-border-dark rounded-2xl"
                                }
                                onClick={() => setSelectGroupId(group.id)}
                              >
                                {group.name}
                              </div>
                            );
                          })
                        ) : (
                          <p>Групп нет</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  type={"submit"}
                  className={
                    "text-primary-light-foreground dark:text-primary-dark-foreground font-medium" +
                    " bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90" +
                    " h-12"
                  }
                >
                  Создать
                </Button>
              </form>
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </div>
  );
}
