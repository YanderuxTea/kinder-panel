"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  colorIcon: string;
  badgeColor: string;
  index: number;
};
export default function FeaturesCard({
  title,
  description,
  icon,
  colorIcon,
  badgeColor,
  index,
}: Props) {
  const delay = 0.3 + index / 10;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className={
        "border border-border-light dark:border-border-dark p-6 rounded-3xl bg-card-light dark:bg-card-dark flex" +
        " flex-col gap-4 group relative overflow-hidden transition-shadow ease-in-out duration-300 hover:shadow-lg" +
        " shadow-black/5" +
        " dark:shadow-black/20"
      }
    >
      <div
        className={`${colorIcon} ${badgeColor} w-12 h-12 shrink-0 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className={"flex flex-col gap-2"}>
        <p
          className={
            "text-lg font-semibold text-foreground-light dark:text-foreground-dark"
          }
        >
          {title}
        </p>
        <p
          className={
            "text-sm leading-relaxed text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          {description}
        </p>
      </div>
      <div
        className={
          "pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full transition-opacity" +
          " duration-300 ease-in-out opacity-0 group-hover:opacity-100 bg-linear-to-br from-primary-light/10" +
          " dark:from-primary-dark/10 to-transparent"
        }
      ></div>
    </motion.div>
  );
}
