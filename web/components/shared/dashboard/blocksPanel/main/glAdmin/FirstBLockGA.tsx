"use client";
import { useEffect, useState, useTransition } from "react";
import { getStatistics } from "@/components/shared/dashboard/blocksPanel/main/glAdmin/action";
import SkeletonLoaderData from "@/components/loaders/dashboard/panels/main/SkeletonLoaderData";

type Statistics = {
  total: number;
  freeCount: number;
  inactiveCount: number;
};
export default function FirstBLockGA() {
  const [loading, setLoading] = useTransition();
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    freeCount: 0,
    inactiveCount: 0,
  });
  useEffect(() => {
    setLoading(async () => {
      const req: Statistics = await getStatistics();
      setStatistics(req);
    });
  }, []);
  return (
    <div className={"flex flex-col gap-3"}>
      <h1
        className={
          "font-semibold text-lg text-foreground-light dark:text-foreground-dark"
        }
      >
        Статистика Киндер
      </h1>
      <div
        className={
          "inline-flex flex-row items-center gap-2 font-medium bg-muted-light/30 dark:bg-muted-dark/30  p-4" +
          " rounded-3xl"
        }
      >
        Количество садиков:{" "}
        <span className={"font-bold"}>
          {loading ? <SkeletonLoaderData /> : statistics.total}
        </span>
      </div>
      <div
        className={
          "inline-flex flex-row items-center gap-2 font-medium  bg-muted-light/30 dark:bg-muted-dark/30 p-4" +
          " rounded-3xl"
        }
      >
        Бесплатные подписки:{" "}
        <span className={"font-bold"}>
          {loading ? <SkeletonLoaderData /> : statistics.freeCount}
        </span>
      </div>
      <div
        className={
          "inline-flex flex-row items-center gap-2 font-medium  bg-muted-light/30 dark:bg-muted-dark/30 p-4" +
          " rounded-3xl"
        }
      >
        Просроченные подписки:{" "}
        <span className={"font-bold"}>
          {loading ? <SkeletonLoaderData /> : statistics.inactiveCount}
        </span>
      </div>
    </div>
  );
}
