"use client";
import { HTMLAttributes } from "react";
import { testimonialsData } from "@/data/TestimonialsData";
import TestimonialsCard from "@/components/shared/main/sections/TestimonialsCard";
import { motion } from "framer-motion";

export default function Testimonials({
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section {...props} className={"px-4 py-20 lg:py-32"}>
      <div className={"flex flex-col mx-auto max-w-7xl"}>
        <div className={"flex flex-col mb-16 max-w-2xl text-center mx-auto"}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={
              "mb-4 text-balance text-3xl font-bold tracking-tight text-foreground-light" +
              " dark:text-foreground-dark sm:text-4xl"
            }
          >
            Любимый родителями и{" "}
            <span className={"text-primary-light dark:text-primary-dark"}>
              воспитателями
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={
              "text-pretty text-lg text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            Присоединитесь к тысячам семей, которые сделали управление детским
            садом простым с помощью нашей платформы.
          </motion.p>
        </div>
        <div
          className={"grid grid-cols-1 auto-rows-fr md:grid-cols-3 gap-8 mb-16"}
        >
          {testimonialsData.map((item, index) => {
            return (
              <TestimonialsCard
                key={item.name}
                index={index}
                name={item.name}
                descriptionName={item.descriptionName}
                avatar={item.avatar}
                rate={item.rate}
                text={item.text}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
