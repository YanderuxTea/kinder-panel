"use client";
import { RolesType } from "@/proxy";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import CreateAdvertisementsForm from "@/components/forms/panels/CreateAdvertisementsForm";
import { Advertisement } from "@/components/forms/panels/action";
import {
  deleteAdvertisement,
  fetchMoreAdvertisements,
  getAdvertisements,
} from "@/components/shared/dashboard/panels/action";
import UserAvatar from "@/components/shared/UserAvatar";
import { TrashIcon } from "@/components/icons";
import { toast } from "sonner";

export default function AdvertisementsPanel({ role }: { role: RolesType }) {
  const subText: Record<RolesType, string> = {
    user: "Следите за объявлениями",
    staff: "Создавайте важные объявления для родителей",
    sad_admin: "Следите за объявлениями ваших садиков",
    gl_admin: "",
  };
  const [cursor, setCursor] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  async function fetchMoreAdvertisementsFunc() {
    const res = await fetchMoreAdvertisements(cursor);
    if (res.data) {
      setAdvertisements((prevState) => [...prevState, ...res.data.data]);
      setCursor(res.data.cursor);
      setHasMore(res.data.hasMore);
    }
  }
  useEffect(() => {
    getAdvertisements().then((res) => {
      if (res.data) {
        setAdvertisements(res.data.data);
        setCursor(res.data.cursor);
        setHasMore(res.data.hasMore);
      }
    });
  }, []);
  const formatter = Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={"flex flex-col pb-10"}>
      <motion.div
        className={"flex flex-col gap-1"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h1
          className={
            "text-2xl lg:text-3xl text-foreground-light dark:text-foreground-dark font-bold"
          }
        >
          Объявления
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
          }
        >
          {subText[role]}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
        className={
          "p-6 mt-8 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark" +
          " min-h-125 flex flex-col gap-5"
        }
      >
        {role === "staff" && (
          <CreateAdvertisementsForm setAdvertisements={setAdvertisements} />
        )}
        <div
          className={`flex-1 flex ${advertisements.length === 0 && "justify-center items-center"}`}
        >
          {advertisements.length > 0 ? (
            <Virtuoso
              style={{ height: 500 }}
              className={"w-full"}
              data={advertisements}
              totalCount={advertisements.length}
              endReached={hasMore ? fetchMoreAdvertisementsFunc : undefined}
              itemContent={(index, data) => {
                return (
                  <div
                    className={
                      "border border-border-light dark:border-border-dark p-2 rounded-2xl my-2 flex flex-row" +
                      " items-start gap-2"
                    }
                  >
                    <div
                      className={
                        "flex flex-row items-center gap-2 w-1/3 lg:w-1/4"
                      }
                    >
                      <span className={"hidden lg:block"}>
                        <UserAvatar
                          size={"md"}
                          fullname={data.author.fullname}
                        />
                      </span>
                      <div className={"flex flex-col font-medium"}>
                        <p
                          className={
                            "text-foreground-light dark:text-foreground-dark wrap-anywhere"
                          }
                        >
                          {data.author.fullname}
                        </p>

                        {role === "sad_admin" && (
                          <p
                            className={
                              "text-muted-light-foreground dark:text-muted-dark-foreground text-sm wrap-anywhere"
                            }
                          >
                            Воспитатель группы{" "}
                            {data?.author?.group?.name || "не указана"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={" w-full "}>
                      <pre
                        className={
                          "wrap-anywhere whitespace-pre-wrap text-foreground-light dark:text-foreground-dark font-medium"
                        }
                      >
                        {data.text}
                      </pre>
                    </div>
                    {role === "staff" && (
                      <button
                        onClick={() =>
                          deleteAdvertisement(data.id).then((res) => {
                            if (res.ok) {
                              toast.success("Успешно");
                              setAdvertisements((prevState) =>
                                prevState.filter((ad) => ad.id !== data.id),
                              );
                            } else {
                              toast.error("Произошла неизвестная ошибка");
                            }
                          })
                        }
                        className={
                          "bg-destructive-light dark:bg-destructive-dark p-2 rounded-lg cursor-pointer"
                        }
                      >
                        <TrashIcon />
                      </button>
                    )}
                    <p
                      className={
                        "font-medium text-xs shrink-0 text-muted-light-foreground dark:text-muted-dark-foreground"
                      }
                    >
                      {formatter.format(new Date(data.createdAt))}
                    </p>
                  </div>
                );
              }}
            />
          ) : (
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
              }
            >
              Объявлений еще нет
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
