"use client";
import { useEffect, useState, useTransition } from "react";
import { Virtuoso } from "react-virtuoso";
import { AnimatePresence } from "framer-motion";
import ModalSkeleton from "@/components/shared/ModalSkeleton";
import {
  Accounts,
  fetchMoreAccounts,
  getAccounts,
} from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";
import CreateAccountForm from "@/components/forms/panels/CreateAccountForm";
import UserAvatar from "@/components/shared/UserAvatar";
import UserRoleConverter from "@/components/shared/dashboard/UserRoleConverter";
import { TrashIcon } from "@/components/icons";
import { deleteAccountFunc } from "@/components/forms/panels/action";
import { toast } from "sonner";

export default function SecondBlockSA() {
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loading, setLoading] = useTransition();
  const [openModal, setOpenModal] = useState<boolean>(false);
  async function deleteAccount(id: string) {
    const res = await deleteAccountFunc(id);
    if (res.ok) {
      toast.success("Аккаунт удален");
      setAccounts((prevState) =>
        prevState.filter((account) => account.id !== id),
      );
    } else {
      toast.error("Произошла неизвестная ошибка");
    }
  }
  async function fetchMore() {
    const res = await fetchMoreAccounts(cursor);
    const { hasMore, cursor: newCursor, accounts } = res.data;
    setAccounts((prevState) => [...prevState, ...accounts]);
    setHasMore(hasMore);
    setCursor(newCursor);
  }
  useEffect(() => {
    setLoading(async () => {
      const res = await getAccounts();
      const { hasMore, cursor: newCursor, accounts } = res.data;
      setCursor(newCursor);
      setHasMore(hasMore);
      setAccounts(accounts);
    });
  }, []);
  return (
    <div className={"flex flex-col min-h-135"}>
      <div className={"flex flex-row justify-between mb-6 items-center gap-2"}>
        <div className={"flex flex-col gap-1"}>
          <p
            className={
              "font-semibold text-lg text-foreground-light dark:text-foreground-dark"
            }
          >
            Аккаунты
          </p>
          <p
            className={
              "text-sm text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
            }
          >
            Здесь вы можете создавать аккаунты для сотрудников и родителей
          </p>
        </div>
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
      </div>
      <div
        className={`border-t-2 p-2 flex-1 border-border-light flex dark:border-border-dark pt-3 ${accounts.length === 0 && "justify-center items-center"}`}
      >
        {accounts.length === 0 ? (
          <p
            className={`text-muted-light-foreground dark:text-muted-dark-foreground font-medium ${loading && "animate-pulse"}`}
          >
            {loading ? "Загрузка..." : "Вы" + " еще не" + " создали аккаунтов"}
          </p>
        ) : (
          <Virtuoso
            endReached={hasMore ? fetchMore : undefined}
            data={accounts}
            style={{ height: 450 }}
            className={"w-full"}
            itemContent={(index, value) => {
              return (
                <div
                  key={value.id}
                  className={
                    "p-3 border border-border-light dark:border-border-dark rounded-2xl" +
                    " bg-input-light/30 dark:bg-input-dark/30 my-3 flex flex-row justify-between items-center gap-2"
                  }
                >
                  <div className={"flex flex-row gap-2 items-center"}>
                    <UserAvatar size={"md"} fullname={value.fullname} />
                    <div className={"flex flex-col gap-1 font-medium"}>
                      <p
                        className={
                          "text-foreground-light dark:text-foreground-dark"
                        }
                      >
                        {value.fullname}
                      </p>
                      <p
                        className={
                          "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
                        }
                      >
                        {value.login}
                      </p>
                    </div>
                  </div>
                  <div className={"flex flex-row gap-2 items-center"}>
                    <div
                      className={
                        " flex-col gap-1 font-medium text-sm hidden lg:flex"
                      }
                    >
                      <UserRoleConverter roleConst={value.role} />
                    </div>
                    <button
                      onClick={() => deleteAccount(value.id)}
                      className={
                        "shrink-0 w-8 h-8 flex items-center justify-center bg-destructive-light" +
                        " dark:bg-destructive-dark rounded-lg p-2 cursor-pointer"
                      }
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
      <AnimatePresence>
        {openModal && (
          <ModalSkeleton setOpenModalAction={setOpenModal}>
            <div className={"flex flex-col w-full gap-6"}>
              <div className={"flex flex-row justify-between"}>
                <h2
                  className={
                    "text-foreground-light dark:text-foreground-dark font-semibold text-lg"
                  }
                >
                  Создание аккаунта
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
              <CreateAccountForm
                setAccounts={setAccounts}
                setOpenModal={setOpenModal}
              />
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </div>
  );
}
