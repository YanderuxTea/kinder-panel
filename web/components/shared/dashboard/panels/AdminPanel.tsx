"use client";
import { AnimatePresence, motion } from "framer-motion";
import Input from "@/components/ui/Input";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import useDebounceQuery from "@/hook/useDebounceQuery";
import { Virtuoso } from "react-virtuoso";
import {
  fetchKindergartens,
  fetchMoreKindergartens,
  Kindergartens,
  searchKindergartens,
} from "./action";
import ModalSkeleton from "@/components/shared/ModalSkeleton";
import ChangeSubscribeForm from "@/components/forms/panels/ChangeSubscribeForm";

export type Query = {
  nameKindergarten: string;
  userLogin: string;
};
export default function AdminPanel() {
  const [kindergartens, setKindergartens] = useState<Kindergartens[]>([]);
  const [targetKindergarten, setTargetKindergarten] = useState<Kindergartens>();
  const [cursor, setCursor] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<Query>({
    nameKindergarten: "",
    userLogin: "",
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useTransition();
  const isFirstRender = useRef<boolean>(true);
  const debounceQuery = useDebounceQuery<Query>(query, 1000);
  async function fetchMore() {
    const res = await fetchMoreKindergartens(cursor, query);
    const { hasMore, kindergartens, cursor: newCursor } = res.data;
    setKindergartens((prevState) => [...prevState, ...kindergartens]);
    setCursor(newCursor);
    setHasMore(hasMore);
  }
  useEffect(() => {
    setLoading(async () => {
      const res = await fetchKindergartens();
      const { hasMore, kindergartens, cursor: newCursor } = res.data;
      setKindergartens(kindergartens);
      setHasMore(hasMore);
      setCursor(newCursor);
      isFirstRender.current = false;
    });
  }, []);
  useEffect(() => {
    if (isFirstRender.current) return;
    searchKindergartens(debounceQuery).then((res) => {
      const { hasMore, kindergartens, cursor: newCursor } = res.data;
      setKindergartens(kindergartens);
      setCursor(newCursor);
      setHasMore(hasMore);
    });
  }, [debounceQuery]);
  const formatter = useMemo(() => {
    return Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);
  return (
    <div className={"flex flex-col"}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={"flex" + " flex-col" + " gap-1 mb-8"}
      >
        <h1
          className={
            "text-2xl lg:text-3xl text-foreground-light dark:text-foreground-dark font-bold"
          }
        >
          Админ панель
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          Управляйте подписками садиков
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
        className={
          "flex flex-col p-6 border border-border-light dark:border-border-dark rounded-3xl bg-card-light" +
          " dark:bg-card-dark gap-6 "
        }
      >
        <p
          className={
            "text-lg font-semibold text-foreground-light dark:text-foreground-dark"
          }
        >
          Садики
        </p>
        <div className={"gap-3 flex flex-col flex-1"}>
          <div
            className={
              "grid grid-cols-1 gap-2 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1"
            }
          >
            <Input
              errorPack={{ isEnableError: false }}
              placeholder={"Название садика"}
              autoComplete={"off"}
              id={"nameKindergarten"}
              value={query.nameKindergarten}
              onChange={(e) =>
                setQuery((prevState) => {
                  return { ...prevState, nameKindergarten: e.target.value };
                })
              }
            />
            <Input
              errorPack={{ isEnableError: false }}
              placeholder={"Логин пользователя"}
              autoComplete={"off"}
              id={"loginUser"}
              value={query.userLogin}
              onChange={(e) =>
                setQuery((prevState) => {
                  return { ...prevState, userLogin: e.target.value };
                })
              }
            />
          </div>
          <div
            className={` flex ${kindergartens.length === 0 && "justify-center items-center"}`}
          >
            {kindergartens.length === 0 ? (
              <p
                className={`text-muted-light-foreground dark:text-muted-dark-foreground font-medium ${loading && "animate-pulse"}`}
              >
                {loading ? "Загрузка..." : "Садиков нет"}
              </p>
            ) : (
              <Virtuoso
                style={{ height: 350 }}
                data={kindergartens}
                className={"w-full select-none"}
                totalCount={kindergartens.length}
                endReached={hasMore ? fetchMore : undefined}
                itemContent={(index, value) => {
                  const isExpired =
                    Date.now() > new Date(value.endSubscription).getTime();
                  return (
                    <div
                      key={value.id}
                      onClick={() => {
                        setOpenModal(true);
                        setTargetKindergarten(value);
                      }}
                      className={
                        "bg-input-light/30 dark:bg-input-dark/30 my-3 mx-1.25 p-3 rounded-2xl overflow-hidden flex" +
                        " transition-colors duration-150 ease-in-out hover:bg-input-light/50" +
                        " dark:hover:bg-input-dark/50" +
                        " flex-row cursor-pointer" +
                        ` items-center justify-between border ${
                          isExpired
                            ? "border-destructive-light dark:border-destructive-dark"
                            : "border-border-light" + " dark:border-border-dark"
                        }`
                      }
                    >
                      <div className={"w-2/3 flex flex-col gap-1 font-medium"}>
                        <p
                          className={
                            "wrap-anywhere font-medium text-foreground-light dark:text-foreground-dark"
                          }
                        >
                          {value.name}
                        </p>
                        <p
                          className={
                            "wrap-anywhere text-xs text-muted-light-foreground dark:text-muted-dark-foreground"
                          }
                        >
                          {value.address}
                        </p>
                      </div>
                      <div
                        className={`w-1/3 flex flex-col gap-1 text-right text-sm font-medium `}
                      >
                        <p
                          className={`${
                            isExpired
                              ? "text-destructive-light dark:text-destructive-dark"
                              : "text-primary-light" + " dark:text-primary-dark"
                          }`}
                        >
                          {isExpired
                            ? "Просрочено"
                            : `До ${formatter.format(new Date(value.endSubscription))}`}
                        </p>
                        <p
                          className={
                            "text-xs text-muted-light-foreground dark:text-muted-dark-foreground"
                          }
                        >
                          Владелец: {value.owner.fullname} | {value.owner.login}
                        </p>
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {openModal && (
          <ModalSkeleton setOpenModalAction={setOpenModal}>
            <div className={"flex flex-col gap-6"}>
              <div className={"font-medium flex flex-col gap-1"}>
                <div className={"flex flex-row justify-between"}>
                  <p
                    className={
                      "text-foreground-light dark:text-foreground-dark text-lg font-semibold wrap-anywhere"
                    }
                  >
                    Садик: {targetKindergarten?.name}
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
                <p
                  className={
                    "text-sm text-foreground-light dark:text-foreground-dark"
                  }
                >
                  Адрес: {targetKindergarten?.address}
                </p>
                <p
                  className={
                    "text-muted-light-foreground dark:text-muted-dark-foreground text-xs"
                  }
                >
                  Владелец: {targetKindergarten?.owner.fullname} |{" "}
                  {targetKindergarten?.owner.login}
                </p>
              </div>
              <div className={"flex flex-col gap-3"}>
                <p
                  className={
                    "text-foreground-light dark:text-foreground-dark font-medium"
                  }
                >
                  Подписка до:{" "}
                  {formatter.format(
                    new Date(targetKindergarten?.endSubscription || ""),
                  )}
                </p>
                <ChangeSubscribeForm
                  setOpenModal={setOpenModal}
                  setKindergartens={setKindergartens}
                  id={targetKindergarten?.id || ""}
                  currentEndSub={
                    new Date(targetKindergarten?.endSubscription || "")
                  }
                />
              </div>
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </div>
  );
}
