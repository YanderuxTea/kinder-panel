"use client";
import {
  getInformation,
  Information,
  Parent,
} from "@/components/shared/dashboard/blocksPanel/main/staff/action";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import UserAvatar from "@/components/shared/UserAvatar";
import { AnimatePresence } from "framer-motion";
import ModalSkeleton from "@/components/shared/ModalSkeleton";

export default function FirstBlockStaff() {
  const [information, setInformation] = useState<Information | null>(null);
  useEffect(() => {
    getInformation().then((res) => {
      setInformation(res.data);
    });
  }, []);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const birthdayChild = information?.childrens.find((child) => {
    const today = new Date();
    const bithDate = new Date(child.dateOfBirth);
    return (
      bithDate.getDate() === today.getDate() &&
      bithDate.getMonth() === today.getMonth()
    );
  });
  const [parents, setParents] = useState<Parent[] | null>(null);
  const formatter = Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  function calculatedAge(dateBirth: Date) {
    const today = new Date();
    const diffMonth = today.getMonth() - dateBirth.getMonth();
    let age = today.getFullYear() - dateBirth.getFullYear();
    if (
      diffMonth < 0 ||
      (diffMonth === 0 && today.getDate() < dateBirth.getDate())
    ) {
      age--;
    }
    return age;
  }
  return (
    <div className={"flex flex-col gap-3"}>
      <p
        className={
          "text-lg text-foreground-light dark:text-foreground-dark font-semibold"
        }
      >
        Информация
      </p>
      <div
        className={
          "font-medium text-foreground-light dark:text-foreground-dark flex flex-col gap-1"
        }
      >
        <p>Группа: {information?.name || "Загрузка"}</p>
        <p>
          Количество детей в группе:{" "}
          {information?._count.childrens || "Загрузка"}
        </p>
        <p>
          День рождения сегодня:{" "}
          {birthdayChild
            ? `${birthdayChild?.name} ${birthdayChild?.surname}`
            : "Нет"}
        </p>
      </div>
      <div
        className={
          "flex flex-col gap-3 border-t pt-3 border-border-light dark:border-border-dark"
        }
      >
        <p
          className={
            "text-lg font-semibold text-foreground-light dark:text-foreground-dark"
          }
        >
          Дети
        </p>
        <div className={"h-100 flex"}>
          {information ? (
            information?.childrens.length > 0 ? (
              <Virtuoso
                className={"w-full"}
                data={information.childrens}
                totalCount={information.childrens.length}
                style={{ height: "100%" }}
                itemContent={(index, data) => {
                  return (
                    <div
                      onClick={() => {
                        setOpenModal(true);
                        setParents(data.parents);
                      }}
                      key={data.id}
                      className={
                        "flex flex-row gap-2 my-2 border p-2 rounded-2xl border-border-light dark:border-border-dark" +
                        " cursor-pointer transition-colors duration-150 ease-in-out hover:bg-input-light/30" +
                        " dark:hover:bg-input-dark/30"
                      }
                    >
                      <div className={"flex flex-row gap-2 items-center"}>
                        <UserAvatar
                          size={"md"}
                          fullname={`${data.name} ${data.surname}`}
                        />
                        <div className={"flex flex-col font-medium"}>
                          <p
                            className={
                              "text-foreground-light dark:text-foreground-dark"
                            }
                          >{`${data.name} ${data.surname}`}</p>
                          <p
                            className={
                              "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
                            }
                          >
                            День рождения:{" "}
                            {formatter.format(new Date(data.dateOfBirth))} •
                            Возраст: {calculatedAge(new Date(data.dateOfBirth))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            ) : (
              <p>Детей нет</p>
            )
          ) : null}
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <ModalSkeleton setOpenModalAction={setOpenModal}>
            <div className={"flex flex-col"}>
              <div
                className={"flex flex-row justify-between items-center mb-6"}
              >
                <h2
                  className={
                    "text-foreground-light dark:text-foreground-dark font-semibold text-lg"
                  }
                >
                  Информация родителей
                </h2>
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
              <div className={"flex flex-col gap-2"}>
                {parents
                  ? parents.length > 0
                    ? parents.map((parent) => {
                        return (
                          <div
                            className={
                              " items-center flex flex-col font-medium text-foreground-light" +
                              " dark:text-foreground-dark border p-3 rounded-2xl border-border-light" +
                              " dark:border-border-dark mx-auto"
                            }
                            key={parent.id}
                          >
                            <UserAvatar
                              size={"lg"}
                              fullname={parent.fullname}
                            />
                            <p className={"mt-2"}>{parent.fullname}</p>
                            <div className={"mt-3 flex flex-col gap-1 text-sm"}>
                              <p>Логин: {parent.login}</p>
                              <p>Адрес: {parent.address}</p>
                              <p>Телефон: {parent.tel}</p>
                              <p>Почта: {parent.email}</p>
                            </div>
                          </div>
                        );
                      })
                    : null
                  : null}
              </div>
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </div>
  );
}
