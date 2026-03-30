"use client";
import { motion } from "framer-motion";

export default function GroupsPanel() {
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
      ></motion.div>
    </div>
  );
}
