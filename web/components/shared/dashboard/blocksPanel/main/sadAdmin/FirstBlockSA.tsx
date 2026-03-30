import { useEffect, useState, useTransition } from "react";
import { getKindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";
import { Virtuoso } from "react-virtuoso";
import { AnimatePresence } from "framer-motion";
import ModalSkeleton from "@/components/shared/ModalSkeleton";
import CreateKindergartenForm from "@/components/forms/panels/CreateKindergartenForm";
import Link from "next/link";

export type Kindergartens = {
  address: string;
  isFreeTier: boolean;
  id: string;
  name: string;
  endSubscription: Date;
  _count: {
    users: number;
  };
};
export default function FirstBlockSA() {
  const [loading, setLoading] = useTransition();
  const [kindergartens, setKindergartens] = useState<Kindergartens[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    setLoading(async () => {
      const res: Kindergartens[] = await getKindergartens();
      setKindergartens(res);
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
    <div className={" flex flex-col min-h-135"}>
      <div
        className={
          "flex flex-row justify-between items-center mb-6 select-none gap-2"
        }
      >
        <div className="flex flex-col gap-1">
          <h2
            className={
              "font-semibold text-lg text-foreground-light dark:text-foreground-dark "
            }
          >
            Ваши садики
          </h2>
          <p
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground text-sm font-medium"
            }
          >
            Здесь вы можете зарегистрировать свой садик
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
          Добавить садик
        </button>
      </div>
      <div
        className={`flex-1 flex ${kindergartens.length === 0 && "justify-center items-center"} border-t-2 border-border-light dark:border-border-dark pt-3`}
      >
        {loading ? (
          <p className={"animate-pulse"}>Загрузка...</p>
        ) : kindergartens.length > 0 ? (
          <Virtuoso
            style={{ height: 450 }}
            className={"w-full"}
            totalCount={kindergartens.length}
            data={kindergartens}
            itemContent={(index, kindergarten) => {
              const isExpired =
                Date.now() > new Date(kindergarten.endSubscription).getTime();
              return (
                <div
                  key={kindergarten.id}
                  className={
                    "bg-muted-light/30 dark:bg-muted-dark/30 rounded-xl flex flex-row my-3 p-3 border justify-between" +
                    ` items-center gap-2 ${
                      isExpired
                        ? "border-destructive-light dark:border-destructive-dark"
                        : "border-border-light" + " dark:border-border-dark"
                    }`
                  }
                >
                  <div className={"flex flex-col"}>
                    <p className={"text-lg font-medium"}>{kindergarten.name}</p>
                    <p
                      className={
                        "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
                      }
                    >
                      {kindergarten.address}
                    </p>
                  </div>
                  <div className={"flex flex-col text-right"}>
                    {isExpired ? (
                      <Link
                        href={"https://t.me/teawithsug"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          "text-sm text-destructive-light dark:text-destructive-dark hover:underline"
                        }
                      >
                        Просрочено
                      </Link>
                    ) : (
                      <p
                        className={
                          "text-sm text-primary-light dark:text-primary-dark text-nowrap"
                        }
                      >
                        До{" "}
                        {formatter.format(
                          new Date(kindergarten.endSubscription),
                        )}
                      </p>
                    )}

                    <p
                      className={
                        "text-xs text-nowrap font-medium text-muted-dark-foreground dark:text-muted-dark-foreground"
                      }
                    >
                      Число людей: {kindergarten._count.users}
                    </p>
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <p
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            Садиков нет. Добавьте садик
          </p>
        )}
      </div>
      <AnimatePresence>
        {openModal && (
          <ModalSkeleton setOpenModalAction={setOpenModal}>
            <div className={"flex flex-col w-full"}>
              <div
                className={"flex flex-row justify-between items-center mb-6"}
              >
                <h2
                  className={
                    "text-foreground-light dark:text-foreground-dark font-semibold text-lg"
                  }
                >
                  Создание садика
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
              <CreateKindergartenForm
                setKindergartens={setKindergartens}
                setOpenModal={setOpenModal}
              />
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </div>
  );
}
