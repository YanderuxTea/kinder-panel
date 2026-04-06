"use client";
import { AbsentIcon, CalendarVisitIcon, CameIcon, SickIcon } from "@/components/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Children, getChildren, markedVisit } from "@/components/shared/dashboard/blocksPanel/visits/user/action";
import { AnimatePresence, motion } from "framer-motion";
import { MonthInformation } from "@/components/shared/dashboard/panels/action";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { Attendance } from "@/hook/getAttendanceConfig";

export default function FirstBlockUser({
  setSelectChildId,
  selectChildId,
  attendance,
  setAttendance,
  setMonthInformation,
}: {
  setAttendance: Dispatch<SetStateAction<MonthInformation[]>>;
  setMonthInformation: Dispatch<SetStateAction<MonthInformation[]>>;
  attendance: MonthInformation[];
  setSelectChildId: (value: string) => void;
  selectChildId: string;
}) {
  const rawDate = Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date());
  const currentDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
  const [children, setChildren] = useState<Children[]>([]);
  useEffect(() => {
    getChildren().then((res) => {
      setChildren(res.data);
    });
  }, []);

  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const findChildren = children.find((child) => child.id === selectChildId);
  const currentVisit =
    attendance.length > 0 &&
    new Date(attendance[0].createdAt).setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0);
  useEffect(() => {
    setSelectMark(currentVisit ? attendance[0].mark : "");
    setReason(currentVisit ? attendance[0].reason || "" : "");
  }, [currentVisit, attendance]);
  const [selectMark, setSelectMark] = useState<"came" | "sick" | "absent" | "">(
    currentVisit ? attendance[0].mark : "",
  );
  const [reason, setReason] = useState<string>(
    currentVisit ? attendance[0].reason || "" : "",
  );
  async function handleSubmit() {
    const res = await markedVisit(selectChildId, selectMark, reason);
    if (res.ok) {
      toast.success("Успешно");
      const currentDate = new Date();
      const now = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      setAttendance((prevState) => {
        if (prevState.length === 0) {
          return [
            { createdAt: now, mark: selectMark as Attendance, reason: reason },
          ];
        }
        const isExist = prevState.some(
          (info) => new Date(info.createdAt).getTime() === now.getTime(),
        );
        if (isExist) {
          return prevState.map((info) => {
            if (new Date(info.createdAt).getTime() === now.getTime()) {
              return {
                createdAt: now,
                mark: selectMark as Attendance,
                reason: reason,
              };
            }
            return info;
          });
        }
        return [
          { createdAt: now, mark: selectMark as Attendance, reason: reason },
          ...prevState,
        ];
      });
      setMonthInformation((prevState) => {
        if (prevState.length === 0) {
          return [
            { createdAt: now, mark: selectMark as Attendance, reason: reason },
          ];
        }
        const isExist = prevState.some(
          (info) => new Date(info.createdAt).getTime() === now.getTime(),
        );
        if (isExist) {
          return prevState.map((info) => {
            if (new Date(info.createdAt).getTime() === now.getTime()) {
              return {
                createdAt: now,
                mark: selectMark as Attendance,
                reason: reason,
              };
            }
            return info;
          });
        }
        return [
          { createdAt: now, mark: selectMark as Attendance, reason: reason },
          ...prevState,
        ];
      });
    } else {
      toast.error("Произошла неизвестная ошибка");
    }
  }
  return (
    <div className={"flex flex-col gap-6"}>
      <div className={"flex flex-row justify-between gap-2 items-center"}>
        <div className={"flex flex-row gap-2 items-center"}>
          <div
            className={
              "text-primary-light dark:text-primary-dark bg-primary-light/10 dark:bg-primary-dark/10" +
              " flex items-center justify-center w-8 h-8 rounded-full shrink-0"
            }
          >
            <CalendarVisitIcon />
          </div>
          <p
            className={
              "font-medium text-foreground-light dark:text-foreground-dark"
            }
          >
            Сегодняшняя отметка
          </p>
        </div>
        <div
          className={
            "text-xs font-medium text-foreground-light dark:text-foreground-dark border border-border-light" +
            " dark:border-border-dark rounded-full px-2 py-0.5 whitespace-nowrap"
          }
        >
          {currentDate}
        </div>
      </div>
      <div
        onClick={() => setOpenDropDown((prevState) => !prevState)}
        className={
          "w-full border border-border-light dark:border-border-dark rounded-2xl p-3 bg-input-light/30" +
          " dark:bg-input-dark/30 text-foreground-light dark:text-foreground-dark font-medium cursor-pointer relative"
        }
      >
        {selectChildId.length === 0
          ? "Выберите ребенка"
          : `${findChildren?.name} ${findChildren?.surname}`}
        <AnimatePresence>
          {openDropDown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                "bg-input-light dark:bg-input-dark border-border-light" +
                " dark:border-border-dark border p-2 absolute inset-x-0 translate-y-full bottom-0 rounded-2xl flex" +
                " flex-col gap-2 cursor-default"
              }
            >
              {children.length > 0
                ? children.map((child) => {
                    return (
                      <div
                        onClick={() => setSelectChildId(child.id)}
                        className={
                          " border border-border-light dark:border-border-dark p-2 rounded-2xl cursor-pointer"
                        }
                        key={child.id}
                      >
                        {child.name} {child.surname}
                      </div>
                    );
                  })
                : "Детей нет"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {selectChildId.length > 0 && (
        <div className={"flex flex-col gap-3"}>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-sm font-medium"}>
              Отметьте заранее если еще не выбрано
            </p>
            <div className={"grid grid-cols-2 gap-2 md:grid-cols-3"}>
              <div
                onClick={() => setSelectMark("came")}
                className={
                  "transition-colors duration-150 ease-in-out select-none rounded-2xl text-sm font-medium flex" +
                  " flex-col" +
                  " justify-center" +
                  " items-center p-4" +
                  " gap-2" +
                  " border-2 " +
                  ` ${
                    currentVisit
                      ? selectMark === "came"
                        ? "text-mint-light dark:text-mint-dark bg-mint-light/20 dark:bg-mint-dark/20" +
                          " border-mint-light dark:border-mint-dark"
                        : "border-border-light dark:border-border-dark" +
                          " text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground"
                      : selectMark === "came"
                        ? "text-mint-light dark:text-mint-dark bg-mint-light/20 dark:bg-mint-dark/20" +
                          " border-mint-light dark:border-mint-dark"
                        : "border-border-light dark:border-border-dark" +
                          " text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground"
                  }`
                }
              >
                <CameIcon size={"lg"} />
                Посещает
              </div>
              <div
                onClick={() => setSelectMark("sick")}
                className={
                  "transition-colors duration-150 ease-in-out select-none rounded-2xl text-sm font-medium flex" +
                  " flex-col" +
                  " justify-center" +
                  " items-center p-4" +
                  " gap-2" +
                  " border-2 " +
                  ` ${
                    currentVisit
                      ? selectMark === "sick"
                        ? "text-mint-light dark:text-mint-dark bg-mint-light/20 dark:bg-mint-dark/20" +
                          " border-mint-light dark:border-mint-dark"
                        : "border-border-light dark:border-border-dark" +
                          " text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground"
                      : selectMark === "sick"
                        ? "text-mint-light dark:text-mint-dark bg-mint-light/20 dark:bg-mint-dark/20" +
                          " border-mint-light dark:border-mint-dark"
                        : "border-border-light dark:border-border-dark" +
                          " text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground"
                  }`
                }
              >
                <SickIcon size={"lg"} />
                Болен
              </div>
              <div
                onClick={() => setSelectMark("absent")}
                className={
                  "transition-colors duration-150 ease-in-out select-none rounded-2xl text-sm font-medium flex" +
                  " flex-col" +
                  " justify-center" +
                  " items-center p-4" +
                  " gap-2" +
                  " border-2 " +
                  ` ${
                    currentVisit
                      ? selectMark === "absent"
                        ? "text-mint-light dark:text-mint-dark bg-mint-light/20 dark:bg-mint-dark/20" +
                          " border-mint-light dark:border-mint-dark"
                        : "border-border-light dark:border-border-dark" +
                          " text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground"
                      : selectMark === "absent"
                        ? "text-mint-light dark:text-mint-dark bg-mint-light/20 dark:bg-mint-dark/20" +
                          " border-mint-light dark:border-mint-dark"
                        : "border-border-light dark:border-border-dark" +
                          " text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground"
                  }`
                }
              >
                <AbsentIcon size={"lg"} />
                Отсутствует
              </div>
            </div>
          </div>
          <div className={"flex flex-col gap-2"}></div>
          {(selectMark === "sick" || selectMark === "absent") && (
            <textarea
              onChange={(e) => setReason(e.target.value)}
              placeholder={"Причина"}
              value={reason}
              id={"reason"}
              className={
                "border outline-none" +
                " border-border-light dark:border-border-dark rounded-2xl resize-none h-30 transition-all" +
                " duration-150 ease-in-out focus:ring-3 ring-primary-light/30 dark:ring-primary-dark/30" +
                " focus:border-primary-light dark:focus:border-primary-dark p-3"
              }
            />
          )}
          {(reason.length > 0 || selectMark.length > 0) && (
            <Button
              onClick={() => handleSubmit()}
              className={
                "bg-primary-light dark:bg-primary-dark" +
                " text-primary-light-foreground dark:text-primary-dark-foreground font-medium" +
                " hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 py-2"
              }
            >
              Отметить
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
