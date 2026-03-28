"use client";
import { HTMLAttributes } from "react";
import { featuresCardData } from "@/data/FeaturesCardData";
import FeaturesCard from "@/components/shared/main/sections/FeaturesCard";
import { motion } from "framer-motion";

export default function Features({ ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...props}
      className={"px-4 bg-muted-light/30 dark:bg-muted-dark/30 py-20 lg:py-32"}
    >
      <div className={"flex flex-col"}>
        <div className={"flex flex-col max-w-2xl mx-auto text-center mb-16"}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={
              "text-balance mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground-light" +
              " dark:text-foreground-dark"
            }
          >
            Все, что вам нужно, чтобы{" "}
            <span className={"text-primary-light dark:text-primary-dark"}>
              оставаться на связи
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={
              "text-pretty text-lg text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            От ежедневных отчетов до важных моментов, наша платформа держит
            родителей и учителей в курсе на протяжении всего пути вашего ребенка
            в детском саду.
          </motion.p>
        </div>
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          }
        >
          {featuresCardData.map((card, index) => {
            return (
              <FeaturesCard
                key={card.title}
                colorIcon={card.colorIcon}
                description={card.description}
                title={card.title}
                badgeColor={card.colorBadge}
                icon={card.icon}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
