"use client";
import React, { useEffect, useRef, useState } from "react";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import {
  getInformationSadAdmin,
  getKindergartens,
  InformationSadAdmin,
} from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";
import Input from "@/components/ui/Input";
import { AnimatePresence, motion } from "framer-motion";

export default function FirstBlockSA() {
  const [kindergartens, setKindergartens] = useState<Kindergartens[]>([]);
  useEffect(() => {
    getKindergartens().then((res) => {
      setKindergartens(res);
    });
  }, []);
  const [selectIdKindergarten, setSelectIdKindergarten] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [information, setInformation] = useState<InformationSadAdmin[]>([]);
  const firstRender = useRef<boolean>(true);
  useEffect(() => {
    if (firstRender.current || !selectIdKindergarten || !date) {
      firstRender.current = false;
      return;
    }
    const convertedDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    getInformationSadAdmin(selectIdKindergarten, convertedDate).then((res) => {
      setInformation(res.data);
    });
  }, [date, selectIdKindergarten]);
  const statisticDay = information.reduce(
    (acc, curr) => {
      acc.countChildren += curr._count.childrens;
      curr.childrens.forEach((child) => {
        acc[child.attendances[0].mark] = acc[child.attendances[0].mark] + 1;
      });
      return acc;
    },
    { came: 0, absent: 0, sick: 0, countChildren: 0 },
  );
  const percentageDay =
    Math.ceil((statisticDay.came / statisticDay.countChildren) * 100) | 0;

  return (
    <div className={"flex flex-col gap-6"}>
      <p
        className={
          "text-lg font-semibold text-foreground-light dark:text-foreground-dark"
        }
      >
        Посещение по дням
      </p>
      <div className={"flex flex-col gap-3 select-none"}>
        <div
          onClick={() => setOpenDropdown(!openDropdown)}
          className={
            "border p-3 rounded-full border-border-light dark:border-border-dark bg-input-light/30" +
            " dark:bg-input-dark/30 relative"
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
        <Input
          id={"dateInput"}
          max={today}
          errorPack={{ isEnableError: false }}
          type={"date"}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {selectIdKindergarten.length > 0 && date && information.length > 0 && (
        <div className={"flex flex-col gap-3"}>
          <p className={"font-medium text-lg"}>
            Статистика садика за этот день
          </p>
          <div className={"flex-wrap flex justify-center gap-3"}>
            <div
              className={
                "w-1/3 md:w-1/4 bg-mint-light-light dark:bg-mint-dark/20 text-mint-light dark:text-mint-dark border" +
                " p-2" +
                " flex items-center justify-center  rounded-md text-sm flex-col"
              }
            >
              {statisticDay.came}
              <span>Пришло</span>
            </div>
            <div
              className={
                "w-1/3 md:w-1/4 flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                " bg-sunshine-light-light dark:bg-sunshine-dark/20 text-sunshine-light dark:text-sunshine-dark"
              }
            >
              {statisticDay.absent}
              <span>Отсутствуют</span>
            </div>
            <div
              className={
                "w-1/3 md:w-1/4 flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                " bg-coral-light-light dark:bg-coral-dark/20 text-coral-light dark:text-coral-dark"
              }
            >
              {statisticDay.sick}
              <span>Болеют</span>
            </div>
            <div
              className={
                "w-1/3 md:w-1/4 flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                " bg-sky-light-light dark:bg-sky-dark/20 text-sky-light dark:text-sky-dark"
              }
            >
              {percentageDay}%<span>Посещения</span>
            </div>
            <div
              className={
                "w-1/3 md:w-1/4 flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                " bg-sky-light-light dark:bg-sky-dark/20 text-sky-light dark:text-sky-dark text-center"
              }
            >
              {statisticDay.countChildren}
              <span>Детей в садике</span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`flex flex-col gap-2 ${
          (selectIdKindergarten.length === 0 ||
            !date ||
            information.length === 0) &&
          "items-center" + " justify-center"
        }`}
      >
        {selectIdKindergarten.length > 0 && date ? (
          information.length > 0 ? (
            information.map((info) => {
              const countAttendance = info.childrens.length;
              const statistics = info.childrens.reduce(
                (acc, curr) => {
                  acc[curr.attendances[0].mark] =
                    acc[curr.attendances[0].mark] + 1;
                  return acc;
                },
                {
                  came: 0,
                  absent: 0,
                  sick: 0,
                },
              );
              const percent =
                Math.ceil((statistics.came / countAttendance) * 100) | 0;
              return (
                <div
                  key={info.id}
                  className={
                    "border p-3 rounded-2xl border-border-light dark:border-border-dark bg-card-light" +
                    " dark:bg-card-dark flex flex-row gap-2 justify-between items-center"
                  }
                >
                  <p className={"font-medium"}>Группа: {info.name}</p>
                  <div
                    className={
                      "flex flex-row gap-2 justify-between items-center"
                    }
                  >
                    <div
                      className={
                        "grid grid-cols-1 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-1"
                      }
                    >
                      <div
                        className={
                          "bg-mint-light-light dark:bg-mint-dark/20 text-mint-light dark:text-mint-dark border p-2" +
                          " flex items-center justify-center  rounded-md text-sm flex-col"
                        }
                      >
                        {statistics.came}
                        <span>Пришло</span>
                      </div>
                      <div
                        className={
                          "flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                          " bg-sunshine-light-light dark:bg-sunshine-dark/20 text-sunshine-light dark:text-sunshine-dark"
                        }
                      >
                        {statistics.absent}
                        <span>Отсутствуют</span>
                      </div>
                      <div
                        className={
                          "flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                          " bg-coral-light-light dark:bg-coral-dark/20 text-coral-light dark:text-coral-dark"
                        }
                      >
                        {statistics.sick}
                        <span>Болеют</span>
                      </div>
                      <div
                        className={
                          "flex items-center justify-center  rounded-md text-sm flex-col border p-2" +
                          " bg-sky-light-light dark:bg-sky-dark/20 text-sky-light dark:text-sky-dark"
                        }
                      >
                        {percent}%<span>Посещения</span>
                      </div>
                    </div>
                    <p
                      className={
                        "text-xs text-muted-light-foreground dark:text-muted-dark-foreground"
                      }
                    >
                      Детей: {info._count.childrens}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
              }
            >
              Групп в данном садике еще нет
            </p>
          )
        ) : (
          <p
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
            }
          >
            Выберите дату и садик
          </p>
        )}
      </div>
    </div>
  );
}
