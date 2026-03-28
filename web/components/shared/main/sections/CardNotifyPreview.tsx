import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  colorIcons: string;
  contentIcon: ReactNode | string;
  positon: string;
  positive: boolean;
  delay: number;
};
export default function CardNotifyPreview({
  title,
  description,
  colorIcons,
  contentIcon,
  positon,
  positive,
  delay,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: positive ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, type: "tween", delay: delay }}
      className={
        "absolute rounded-3xl border border-border-light dark:border-border-dark p-4 flex-row gap-3 items-center" +
        " hidden" +
        ` lg:flex bg-card-light dark:bg-card-dark ${positon} text-left`
      }
    >
      <div
        className={`flex justify-center items-center w-10 h-10 rounded-full shrink-0 ${colorIcons}`}
      >
        {contentIcon}
      </div>
      <div className={"flex flex-col"}>
        <p
          className={"text-foreground-light dark:text-foreground-dark text-sm"}
        >
          {title}
        </p>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground text-xs"
          }
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
