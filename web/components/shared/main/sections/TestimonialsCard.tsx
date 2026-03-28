"use client";
import { motion } from "framer-motion";
import { QuotesIcon, StarIcon } from "@/components/icons";

type Props = {
  rate: number;
  text: string;
  index: number;
  avatar: string;
  name: string;
  descriptionName: string;
};
export default function TestimonialsCard({
  rate,
  descriptionName,
  name,
  avatar,
  text,
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
        "p-6 relative overflow-hidden rounded-3xl bg-card-light dark:bg-card-dark border" +
        " border-border-light dark:border-border-dark flex flex-col gap-4"
      }
    >
      <div className={"flex flex-row gap-1"}>
        {[...Array(rate)].map((_, i) => {
          return <StarIcon key={`${i}_${name}`} />;
        })}
        <QuotesIcon />
      </div>
      <div
        className={
          "flex-1 text-pretty leading-relaxed text-foreground-light dark:text-foreground-dark"
        }
      >
        <p>{text}</p>
      </div>
      <div className={"flex flex-row gap-3"}>
        <div
          className={
            "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm" +
            " bg-primary-light/10 dark:bg-primary-dark/10 shrink-0 text-primary-light dark:text-primary-dark"
          }
        >
          {avatar}
        </div>
        <div className={"flex flex-col"}>
          <p
            className={
              "text-sm font-semibold text-foreground-light dark:text-foreground-dark"
            }
          >
            {name}
          </p>
          <p
            className={
              "text-xs text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            {descriptionName}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
