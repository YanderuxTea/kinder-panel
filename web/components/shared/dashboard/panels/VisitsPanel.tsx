"use client";
import { RolesType } from "@/proxy";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import FirstBlockUser from "@/components/shared/dashboard/blocksPanel/visits/user/FirstBlockUser";
import SecondBlockUser from "@/components/shared/dashboard/blocksPanel/visits/user/SecondBlockUser";
import ThirdBlockUser from "@/components/shared/dashboard/blocksPanel/visits/user/ThirdBlockUser";
import FourthBlockUser from "@/components/shared/dashboard/blocksPanel/visits/user/FourthBlockUser";
import {
  fetchMoreHistory,
  getHistory,
  getMonthInformation,
  MonthInformation,
} from "@/components/shared/dashboard/panels/action";
import FirstBlockStaff from "@/components/shared/dashboard/blocksPanel/visits/staff/FirstBlockStaff";
import FirstBlockSA from "@/components/shared/dashboard/blocksPanel/visits/sad_admin/FirstBlockSA";

export default function VisitsPanel({ role }: { role: RolesType }) {
  const [selectChildId, setSelectChildId] = useState<string>("");
  const firstRender = useRef<boolean>(true);
  const loading = useRef<boolean>(false);
  const [monthYear, setMonthYear] = useState<{ month: number; year: number }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [attendanceMonth, setAttendanceMonth] = useState<MonthInformation[]>(
    [],
  );
  const [history, setHistory] = useState<MonthInformation[]>([]);
  const [cursor, setCursor] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  async function fetchMoreHistoryFunc() {
    const res = await fetchMoreHistory(selectChildId, cursor);
    const { data, cursor: newCursor, hasMore } = res.data;
    setHistory((prevState) => [...prevState, ...data]);
    setCursor(newCursor);
    setHasMore(hasMore);
  }
  useEffect(() => {
    if (firstRender.current || loading.current || role !== "user") {
      return;
    }
    loading.current = true;
    setMonthYear({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });
    getMonthInformation(
      selectChildId,
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    ).then((res) => {
      setAttendanceMonth(res.data);
    });
    getHistory(selectChildId).then((res) => {
      const { data, cursor, hasMore } = res.data;
      setCursor(cursor);
      setHasMore(hasMore);
      setHistory(data);
      loading.current = false;
    });
  }, [selectChildId]);
  useEffect(() => {
    if (firstRender.current || role !== "user") {
      firstRender.current = false;
      return;
    }
    if (loading.current) {
      return;
    }
    loading.current = true;
    getMonthInformation(selectChildId, monthYear.year, monthYear.month).then(
      (res) => {
        setAttendanceMonth(res.data);
        loading.current = false;
      },
    );
  }, [monthYear]);
  const subText: Record<RolesType, string> = {
    user: "Следите за посещениями вашего ребенка",
    staff: "Создавайте отчет посещения удобнее",
    sad_admin: "Контролируйте посещения ваших садиков",
    gl_admin: "",
  };
  const firstBlock: Record<RolesType, ReactNode> = {
    user: (
      <FirstBlockUser
        setAttendance={setHistory}
        setMonthInformation={setAttendanceMonth}
        selectChildId={selectChildId}
        attendance={history}
        setSelectChildId={setSelectChildId}
      />
    ),
    staff: <FirstBlockStaff />,
    sad_admin: <FirstBlockSA />,
    gl_admin: null,
  };
  const secondBlock: Record<RolesType, ReactNode> = {
    user: (
      <SecondBlockUser
        monthYear={monthYear}
        attendanceMonth={attendanceMonth}
        setMonthYear={setMonthYear}
        selectChildId={selectChildId}
      />
    ),
    staff: null,
    sad_admin: null,
    gl_admin: null,
  };
  const thirdBlock: Record<RolesType, ReactNode> = {
    user: (
      <ThirdBlockUser
        monthAttendance={attendanceMonth}
        selectChildId={selectChildId}
      />
    ),
    staff: null,
    sad_admin: null,
    gl_admin: null,
  };
  const fourthBlock: Record<RolesType, ReactNode> = {
    user: (
      <FourthBlockUser
        hasMore={hasMore}
        fetchMore={fetchMoreHistoryFunc}
        history={history}
        selectChildId={selectChildId}
      />
    ),
    staff: null,
    sad_admin: null,
    gl_admin: null,
  };
  return (
    <div className={"flex flex-col pb-20"}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={"flex flex-col gap-1"}
      >
        <h1
          className={
            "text-2xl lg:text-3xl text-foreground-light dark:text-foreground-dark font-bold"
          }
        >
          Посещения
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
          }
        >
          {subText[role]}
        </p>
      </motion.div>
      <div className={"flex flex-col gap-6 lg:flex-row mt-8"}>
        <div
          className={`w-full flex flex-col gap-6 ${thirdBlock[role] ? "lg:w-2/3" : "w-full"} `}
        >
          {firstBlock[role] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
              className={
                "p-6 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
              }
            >
              {firstBlock[role]}
            </motion.div>
          )}
          {secondBlock[role] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
              className={
                "p-6 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
              }
            >
              {secondBlock[role]}
            </motion.div>
          )}
        </div>

        {thirdBlock[role] && (
          <div className={"flex flex-col w-full gap-6 lg:w-1/3"}>
            {thirdBlock[role] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.6 }}
                className={
                  "p-6 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
                }
              >
                {thirdBlock[role]}
              </motion.div>
            )}
            {fourthBlock[role] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.8 }}
                className={
                  "p-6 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
                }
              >
                {fourthBlock[role]}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
