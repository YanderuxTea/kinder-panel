"use client";
import Button from "@/components/ui/Button";
import { ArrowIcon, CheckMark, PlayIcons } from "@/components/icons";
import Link from "next/link";
import { advantagesData } from "@/data/AdvantagesData";
import PreviewInHeroSection from "@/components/shared/main/sections/PreviewInHeroSection";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className={
        "relative overflow-hidden px-4 py-20 lg:py-32 w-full bg-background-light dark:bg-background-dark"
      }
    >
      <div
        className={"absolute inset-0 pointer-events-none overflow-hidden z-1"}
      >
        <div
          className={
            "absolute -top-40 -right-40 h-80 w-80 rounded-full bg-mint-light-light/40" +
            " dark:bg-mint-dark/10 blur-3xl"
          }
        ></div>
        <div
          className={
            "absolute top-60 -left-40 h-80 w-80 rounded-full bg-sky-light-light/40 blur-3xl" +
            " dark:bg-sky-dark/10"
          }
        ></div>
        <div
          className={
            "absolute bottom-20 right-20 h-60 w-60 rounded-full bg-sunshine-light-light/40" +
            " dark:bg-sunshine-dark/10 blur-3xl"
          }
        ></div>
      </div>
      <div
        className={"max-w-7xl mx-auto flex flex-col text-center relative z-2"}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
          className={
            "text-4xl text-foreground-light dark:text-foreground-dark font-extrabold sm:text-5xl lg:text-6xl" +
            " text-balance tracking-tight mb-6 max-w-4xl mx-auto"
          }
        >
          Современный способ{" "}
          <span
            className={
              "bg-linear-to-r from-mint-light dark:from-mint-dark via-sky-light dark:via-sky-dark" +
              " to-mint-light dark:to-mint-dark bg-clip-text text-transparent"
            }
          >
            управления вашим детским садом
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween", delay: 0.1 }}
          className={
            "mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-light-foreground" +
            " dark:text-muted-dark-foreground lg:text-xl"
          }
        >
          Свяжите родителей и учителей с помощью обновлений в реальном времени о
          посещаемости, питании, занятиях и объявлениях. Все необходимое в одной
          красивой и простой в использовании платформе.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween", delay: 0.2 }}
          className={
            "flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          }
        >
          <Link href={"/register"}>
            <Button
              iconRight={<ArrowIcon />}
              className={
                "text-primary-light-foreground dark:text-primary-dark-foreground bg-primary-light dark:bg-primary-dark" +
                " h-12 px-4 font-medium shadow-lg shadow-primary-light/25 dark:shadow-primary-dark/25" +
                " hover:bg-primary-light/90 dark:hover:bg-primary-dark/90"
              }
            >
              Зарегистрироваться
            </Button>
          </Link>
          <Button
            iconLeft={<PlayIcons />}
            className={
              "text-foreground-light dark:text-foreground-dark bg-background-light dark:bg-input-dark/30 " +
              " border border-input-light dark:border-border-dark h-12 px-4 font-medium hover:bg-accent-light" +
              " hover:text-accent-light-foreground group dark:hover:bg-input-dark/50 dark:hover:text-accent-dark-foreground"
            }
          >
            Смотреть демо
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween", delay: 0.3 }}
          className={
            "flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          {advantagesData.map((advantage) => {
            return (
              <div
                key={advantage.label}
                className={"flex flex-row gap-2 items-center  "}
              >
                <CheckMark size={"sm"} />
                {advantage.label}
              </div>
            );
          })}
        </motion.div>
        <PreviewInHeroSection />
      </div>
    </section>
  );
}
