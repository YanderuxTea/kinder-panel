"use client";
import { RolesType } from "@/proxy";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function VisitsPanel({ role }: { role: RolesType }) {
  const subText: Record<RolesType, string> = {
    user: "Следите за посещениями вашего ребенка",
    staff: "Создавайте отчет посещения удобнее",
    sad_admin: "Контролируйте посещения ваших садиков",
    gl_admin: "",
  };
  const block: Record<RolesType, ReactNode> = {
    user: null,
    staff: null,
    sad_admin: null,
    gl_admin: null,
  };
  return (
    <div className={"flex flex-col"}>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
        className={
          "p-6 mt-8 bg-card-light dark:bg-card-dark rounded-3xl border border-border-light dark:border-border-dark"
        }
      >
        {block[role]}
      </motion.div>
    </div>
  );
}
