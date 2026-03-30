"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useTransition } from "react";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import { getKindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";
import { nutritionDaysData } from "@/data/NutritionDaysData";
import { getNutritionFunc, Nutrition } from "@/components/shared/dashboard/panels/action";

export default function NutritionPanel() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [kindergartens, setKindergartens] = useState<Kindergartens[]>([]);
  const [nutrition, setNutrition] = useState<Nutrition | null>(null);
  const [loading, setLoading] = useTransition();
  const firstRender = useRef<boolean>(true);
  const [selectKindergartensId, setSelectKindergartensId] =
    useState<string>("");
  useEffect(() => {
    setLoading(async () => {
      const res = await getKindergartens();
      setKindergartens(res);
    });
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getNutritionFunc(selectKindergartensId).then((res) => {
      setNutrition(res.data);
    });
  }, [selectKindergartensId]);
  return (
    <div className={"flex flex-col"}>
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
          Питание
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
          }
        >
          Создавайте недельное расписание питания
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
        className={
          "p-6 mt-8 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark" +
          " flex flex-col"
        }
      >
        <div className="flex flex-row gap-2 items-center mb-6">
          <p className={"shrink-0"}>Выберите садик:</p>
          <div
            onClick={() => setOpenDropdown((prevState) => !prevState)}
            className={
              "h-12 bg-input-light/30 dark:bg-input-dark/30 border border-border-light dark:border-border-dark" +
              " w-full rounded-3xl relative select-none p-3 flex items-center"
            }
          >
            {kindergartens.find(
              (kindergarten) => kindergarten.id === selectKindergartensId,
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
                    " dark:border-border-dark translate-y-full rounded-2xl flex flex-col select-none gap-2"
                  }
                >
                  {kindergartens.map((kindergarten) => {
                    return (
                      <div
                        key={kindergarten.id + "np"}
                        className={
                          "cursor-pointer p-3 border border-border-light dark:border-border-dark rounded-2xl"
                        }
                        onClick={() =>
                          setSelectKindergartensId(kindergarten.id)
                        }
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
        <div
          className={`border-t-2 border-border-light dark:border-border-dark p-2 ${selectKindergartensId.trim().length === 0 ? "flex justify-center items-center" : "flex flex-wrap gap-2 items-center justify-center w-full"}`}
        >
          {selectKindergartensId.trim().length === 0 ? (
            <p
              className={
                "font-medium text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              Выберите садик
            </p>
          ) : (
            nutritionDaysData.map((day) => {
              return (
                <div
                  key={day.value}
                  className={
                    "w-full lg:w-[30%] border p-3 rounded-2xl border-border-light dark:border-border-dark" +
                    " bg-card-light/30 dark:bg-input-dark/30 flex flex-col gap-3"
                  }
                >
                  <p
                    className={
                      "text-lg font-semibold text-foreground-light dark:text-foreground-dark"
                    }
                  >
                    {day.title}
                  </p>
                  <div
                    className={
                      "flex flex-col gap-3 text-foreground-light dark:text-foreground-dark font-medium"
                    }
                  >
                    {day.times.map((time) => {
                      return (
                        <div key={time.title}>
                          <p>{time.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
}
