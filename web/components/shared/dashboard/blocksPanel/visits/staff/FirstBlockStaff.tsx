"use client";

import { useEffect, useState } from "react";
import {
  ChildrenStaff,
  getChildrenStaff,
} from "@/components/shared/dashboard/blocksPanel/visits/staff/action";
import { Virtuoso } from "react-virtuoso";
import UserAvatar from "@/components/shared/UserAvatar";
import { AbsentIcon, CameIcon, SickIcon } from "@/components/icons";
import { Attendance, getAttendanceConfig } from "@/hook/getAttendanceConfig";
import { AnimatePresence } from "framer-motion";
import ModalSkeleton from "@/components/shared/ModalSkeleton";
import Button from "@/components/ui/Button";
import { markedVisit } from "@/components/shared/dashboard/blocksPanel/visits/user/action";
import { toast } from "sonner";

export default function FirstBlockStaff() {
  const [children, setChildren] = useState<ChildrenStaff[]>([]);
  useEffect(() => {
    getChildrenStaff().then((res) => {
      setChildren(res.data);
    });
  }, []);
  const rawDate = Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date());
  const partsDate = rawDate.split(" ");
  const currentDate = partsDate
    .map((part, index) => {
      if (index === 0) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
      if (index === 2) {
        return part.charAt(0).toUpperCase() + part.slice(1).replace(".", "");
      }
      return part;
    })
    .join(" ");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectIdChild, setSelectIdChild] = useState<string>("");
  const [selectMark, setSelectMark] = useState<Attendance | null>(null);
  const [selectReason, setSelectReason] = useState<string>("");
  const [selectFullname, setSelectFullname] = useState<string>("");
  const statistics = children.reduce(
    (acc, curr) => {
      if (curr.attendances.length === 0) {
        return acc;
      }
      const attendance = curr.attendances[0];
      const isCurrent =
        new Date(attendance.createdAt).getTime() ===
        new Date().setHours(0, 0, 0, 0);
      if (!isCurrent) {
        return acc;
      }
      acc[curr.attendances[0].mark] = acc[curr.attendances[0].mark] + 1;
      return acc;
    },
    { came: 0, absent: 0, sick: 0 },
  );
  const percent = Math.ceil((statistics.came / children.length) * 100) | 0;
  async function handleSubmit() {
    if (!selectMark) {
      toast.error("Выберите отметку");
      return;
    }
    const req = await markedVisit(selectIdChild, selectMark, selectReason);
    if (req.ok) {
      setChildren((prevState) =>
        prevState.map((child) => {
          if (child.id === selectIdChild) {
            return {
              ...child,
              attendances: [
                {
                  mark: selectMark,
                  reason: selectReason,
                  createdAt: new Date(new Date().setHours(0, 0, 0, 0)),
                },
              ],
            };
          }
          return child;
        }),
      );
      setOpenModal(false);
    } else {
      toast.error("Произошла неизвестная ошибка");
    }
  }
  return (
    <div className={"flex flex-col gap-6"}>
      <div className={"flex flex-row justify-between items-center"}>
        <p
          className={
            "text-lg text-foreground-light dark:text-foreground-dark font-semibold"
          }
        >
          Посещения сегодня
        </p>
        <div
          className={
            "text-xs bg-secondary-light dark:bg-secondary-dark p-2 rounded-full text-secondary-light-foreground" +
            " dark:text-secondary-dark-foreground"
          }
        >
          {currentDate}
        </div>
      </div>
      <div
        className={`border-t border-border-light dark:border-border-dark pt-3 flex ${children.length === 0 && "justify-center items-center"}`}
      >
        {children.length > 0 ? (
          <Virtuoso
            style={{ height: 400 }}
            className={"w-full"}
            totalCount={children.length}
            data={children}
            itemContent={(index, data) => {
              const isAttendanceCurrent =
                data.attendances[0] &&
                new Date().setHours(0, 0, 0, 0) ===
                  new Date(data.attendances[0].createdAt).getTime();
              const attendance = isAttendanceCurrent
                ? data.attendances[0]
                : null;
              const fullname = `${data.name} ${data.surname}`;
              const configAttendance = getAttendanceConfig(
                attendance?.mark || "came",
                "lg",
              );
              return (
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setSelectIdChild(data.id);
                    setSelectMark(attendance?.mark || null);
                    setSelectReason(attendance?.reason || "");
                    setSelectFullname(fullname);
                  }}
                  key={data.id}
                  className={
                    "flex flex-row justify-between p-3 rounded-2xl items-center border border-border-light" +
                    " dark:border-border-dark my-2 gap-2 cursor-pointer"
                  }
                >
                  <div className={"flex flex-row items-center gap-2"}>
                    <UserAvatar size={"md"} fullname={fullname} />
                    <p
                      className={
                        "font-medium text-foreground-light dark:text-foreground-dark"
                      }
                    >
                      {fullname}
                    </p>
                  </div>
                  <div className={"flex flex-col gap-2 w-28"}>
                    <div className={"flex flex-row gap-2 shrink-0"}>
                      <div
                        className={`w-8 h-8 flex items-center justify-center border-2 rounded-md ${isAttendanceCurrent ? (attendance?.mark === "came" ? `${configAttendance.color}` : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground") : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground"}`}
                      >
                        <CameIcon size={"lg"} />
                      </div>
                      <div
                        className={`w-8 h-8 flex items-center justify-center border-2 rounded-md ${isAttendanceCurrent ? (attendance?.mark === "absent" ? `${configAttendance.color}` : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground") : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground"}`}
                      >
                        <AbsentIcon size={"lg"} />{" "}
                      </div>
                      <div
                        className={`w-8 h-8 flex items-center justify-center border-2 rounded-md ${isAttendanceCurrent ? (attendance?.mark === "sick" ? `${configAttendance.color}` : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground") : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground"}`}
                      >
                        <SickIcon size={"lg"} />
                      </div>
                    </div>
                    {isAttendanceCurrent &&
                      (attendance?.mark === "absent" ||
                        attendance?.mark === "sick") && (
                        <div className={"text-center"}>
                          <p
                            className={
                              "text-xs text-muted-light-foreground dark:text-muted-dark-foreground wrap-break-word overflow-hidden"
                            }
                          >
                            {attendance.reason}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              );
            }}
          />
        ) : (
          <p
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground" +
              " font-medium"
            }
          >
            Детей в группе нет
          </p>
        )}
      </div>
      <div className={"flex flex-col gap-3"}>
        <p
          className={
            "font-medium text-foreground-light dark:text-foreground-dark"
          }
        >
          Статистика
        </p>
        <div className={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
          <div
            className={
              "p-3 rounded-2xl border  text-mint-light dark:text-mint-dark bg-mint-light-light dark:bg-mint-dark/20" +
              " flex items-center justify-center flex-col"
            }
          >
            <p className={"text-2xl font-bold"}>{statistics.came}</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
              }
            >
              Пришло
            </p>
          </div>
          <div
            className={
              "p-3 rounded-2xl border text-sunshine-light dark:text-sunshine-dark bg-sunshine-light-light" +
              " dark:bg-sunshine-dark/20  flex items-center justify-center flex-col"
            }
          >
            <p className={"text-2xl font-bold"}>{statistics.absent}</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
              }
            >
              Отсутствуют
            </p>
          </div>
          <div
            className={
              "p-3 rounded-2xl border text-coral-light dark:text-coral-dark bg-coral-light-light" +
              " dark:bg-coral-dark/20  flex items-center justify-center flex-col"
            }
          >
            <p className={"text-2xl font-bold"}>{statistics.sick}</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
              }
            >
              Болеют
            </p>
          </div>
          <div
            className={
              "p-3 rounded-2xl border text-sky-light dark:text-sky-dark bg-sky-light-light" +
              " dark:bg-sky-dark/20 flex items-center justify-center flex-col"
            }
          >
            <p className={"text-2xl font-bold"}>{percent}%</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
              }
            >
              Явка
            </p>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <ModalSkeleton setOpenModalAction={setOpenModal}>
            <div className={"flex flex-col gap-6"}>
              <div className={"flex flex-row justify-between"}>
                <p
                  className={
                    "text-foreground-light dark:text-foreground-dark text-lg font-semibold wrap-anywhere"
                  }
                >
                  Отметить посещение
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
              <div className={"flex-col flex gap-3 items-center"}>
                <div className={"flex flex-col items-center gap-2"}>
                  <UserAvatar size={"lg"} fullname={selectFullname} />
                  <p
                    className={
                      "text-foreground-light dark:text-foreground-dark font-medium text-lg"
                    }
                  >
                    {selectFullname}
                  </p>
                </div>
                <div
                  className={
                    "grid grid-cols-2 sm:grid-cols-3 gap-2 select-none"
                  }
                >
                  <button
                    onClick={() => setSelectMark("came")}
                    className={`border p-3 rounded-md flex flex-col items-center gap-1 cursor-pointer transition-colors duration-150 ease-in-out ${
                      selectMark === "came"
                        ? "text-mint-light dark:text-mint-dark" +
                          " bg-mint-light-light" +
                          " dark:bg-mint-dark/20"
                        : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground"
                    }`}
                  >
                    <CameIcon size={"lg"} />
                    Присутствует
                  </button>
                  <button
                    onClick={() => setSelectMark("absent")}
                    className={`border p-3 rounded-md flex flex-col items-center gap-1 cursor-pointer transition-colors duration-150 ease-in-out ${
                      selectMark === "absent"
                        ? 'text-sunshine-light dark:text-sunshine-dark bg-sunshine-light-light" +\n' +
                          '              " dark:bg-sunshine-dark/20  flex items-center justify-center flex-col"'
                        : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground"
                    }`}
                  >
                    <AbsentIcon size={"lg"} />
                    Отсутствует
                  </button>
                  <button
                    onClick={() => setSelectMark("sick")}
                    className={`border p-3 rounded-md flex flex-col items-center gap-1 cursor-pointer transition-colors duration-150 ease-in-out ${
                      selectMark === "sick"
                        ? 'text-coral-light dark:text-coral-dark bg-coral-light-light" +\n' +
                          '              " dark:bg-coral-dark/20  flex items-center justify-center flex-col"'
                        : "border-border-light dark:border-border-dark text-muted-light-foreground dark:text-muted-dark-foreground"
                    }`}
                  >
                    <SickIcon size={"lg"} />
                    Заболел
                  </button>
                </div>

                {(selectMark === "absent" || selectMark === "sick") && (
                  <textarea
                    value={selectReason}
                    onChange={(e) => setSelectReason(e.target.value)}
                    placeholder={"Причина"}
                    id="reasonTextArea"
                    className={
                      "w-full resize-none border rounded-2xl h-20 border-border-light dark:border-border-dark outline-none" +
                      " focus:border-primary-light dark:focus:border-primary-dark transition-all duration-150 ease-in-out" +
                      " focus:ring-3 ring-primary-light/30 dark:ring-primary-dark/30 p-3"
                    }
                  />
                )}
                <Button
                  onClick={() => handleSubmit()}
                  className={
                    "bg-primary-light dark:bg-primary-dark text-primary-light-foreground" +
                    " dark:text-primary-dark-foreground hover:bg-primary-light/90 dark:hover:bg-primary-dark/90" +
                    " w-full py-2 font-medium"
                  }
                >
                  Отметить
                </Button>
              </div>
            </div>
          </ModalSkeleton>
        )}
      </AnimatePresence>
    </div>
  );
}
