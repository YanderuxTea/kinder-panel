"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import { getKindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";
import { getGroups, Groups } from "@/components/shared/dashboard/panels/action";
import FirstBlockSa from "@/components/shared/dashboard/blocksPanel/groups/sadAdmin/FirstBlockSa";
import SecondBlockSA from "@/components/shared/dashboard/blocksPanel/groups/sadAdmin/SecondBlockSA";

export default function GroupsPanel() {
  const [selectIdKindergarten, setSelectIdKindergarten] = useState<string>("");
  const [kindergartens, setKindergartens] = useState<Kindergartens[]>([]);
  const [loading, setLoading] = useTransition();
  const firstRender = useRef<boolean>(true);
  const [groups, setGroups] = useState<Groups[]>([]);
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
    getGroups(selectIdKindergarten).then((res) => {
      setGroups(res.groups);
    });
  }, [selectIdKindergarten]);
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
          Группы
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
          }
        >
          Создавайте аккаунты детей для родителей и управляйте группами
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
        className={
          "p-6 mt-8 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
        }
      >
        <FirstBlockSa
          setGroups={setGroups}
          groups={groups}
          selectIdKindergarten={selectIdKindergarten}
          setSelectIdKindergarten={setSelectIdKindergarten}
          kindergartens={kindergartens}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
        className={
          "p-6 mt-8 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
        }
      >
        <SecondBlockSA
          setGroups={setGroups}
          selectIdKindergarten={selectIdKindergarten}
          groups={groups}
        />
      </motion.div>
    </div>
  );
}
