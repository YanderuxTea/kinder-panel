"use client";
import { RolesType } from "@/proxy";
import { motion } from "framer-motion";

export default function AdvertisementsPanel({ role }: { role: RolesType }) {
  const subText: Record<RolesType, string> = {
    user: "Следите за объявлениями",
    staff: "Создавайте важные объявления для родителей",
    sad_admin: "Следите за объявлениями ваших садиков",
    gl_admin: "",
  };
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
          Объявления
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
          }
        >
          {subText[role]}
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
        className={
          "p-6 mt-8 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
        }
      ></motion.div>
    </div>
  );
}
