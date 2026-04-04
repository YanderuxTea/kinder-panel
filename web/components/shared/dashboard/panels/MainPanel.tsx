"use client";
import { RolesType } from "@/proxy";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import FirstBlockSA from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import FirstBLockGA from "@/components/shared/dashboard/blocksPanel/main/glAdmin/FirstBLockGA";
import SecondBlockSA from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/SecondBlockSA";
import FirstBlockUser from "@/components/shared/dashboard/blocksPanel/main/user/FirstBlockUser";
import SecondBlockUser from "@/components/shared/dashboard/blocksPanel/main/user/SecondBlockUser";
import FirstBlockStaff from "@/components/shared/dashboard/blocksPanel/main/staff/FirstBlockStaff";

export default function MainPanel({
  fullname,
  role,
}: {
  fullname: string;
  role: RolesType;
}) {
  const subText: Record<RolesType, string> = {
    user: "Взаимодействовать с садиком вместе с киндер удобнее",
    staff: "Отчеты с Киндер удобнее",
    sad_admin: "Контролировать садик с Киндер удобнее",
    gl_admin: "Вы являетесь Администратором сайта",
  };
  const firstBlock: Record<RolesType, ReactNode> = {
    user: <FirstBlockUser />,
    staff: <FirstBlockStaff />,
    sad_admin: <FirstBlockSA />,
    gl_admin: <FirstBLockGA />,
  };
  const secondBlock: Record<RolesType, ReactNode> = {
    user: <SecondBlockUser />,
    staff: null,
    sad_admin: <SecondBlockSA />,
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
          Добро пожаловать, {fullname.split(" ").at(0)}!
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground leading-relaxed"
          }
        >
          {subText[role]}
        </p>
      </motion.div>
      <motion.div
        className={
          "mt-8 p-6 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark rounded-3xl"
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
      >
        {firstBlock[role]}
      </motion.div>

      {secondBlock[role] && (
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          className={
            "mt-8 p-6 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark rounded-3xl mb-8"
          }
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
        >
          {secondBlock[role]}
        </motion.div>
      )}
    </div>
  );
}
