"use client";
import Logo from "@/components/shared/Logo";
import SwitcherThemeButton from "@/components/shared/SwitcherThemeButton";
import BurgerMenuButton from "@/components/shared/BurgerMenuButton";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navDataLinks } from "@/data/NavDataLinks";
import Link from "next/link";

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  return (
    <header
      className={
        "z-50 sticky top-0 bg-background-light/95 dark:bg-background-dark/95" +
        " supports-backdrop-filter:bg-background-light/60 backdrop-blur" +
        " dark:supports-backdrop-filter:bg-background-dark/60 border-b border-border-light dark:border-border-dark"
      }
    >
      <div
        className={
          "p-4 max-w-7xl mx-auto w-full flex flex-row justify-between items-center"
        }
      >
        <Logo />
        <nav className={"flex-row gap-8 hidden lg:flex"}>
          {navDataLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "text-sm font-medium text-muted-light-foreground dark:text-muted-dark-foreground transition-colors" +
                  " duration-150 ease-in-out hover:text-foreground-light dark:hover:text-foreground-dark"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className={"flex flex-row gap-2"}>
          <SwitcherThemeButton />
          <BurgerMenuButton
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            isOpenMenu={isOpenMenu}
          />
          <div className={"flex-row gap-2 hidden lg:flex"}>
            <Link href={"/login"}>
              <Button
                className={
                  "text-sm text-foreground-light dark:text-foreground-dark font-medium px-4" +
                  " hover:text-accent-light-foreground hover:bg-accent-light dark:hover:bg-accent-dark/50" +
                  " dark:hover:text-accent-dark-foreground h-9"
                }
              >
                Вход
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button
                className={
                  "text-sm text-foreground-dark dark:text-foreground-light font-medium bg-primary-light" +
                  " dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-light/90 px-4 h-9"
                }
              >
                Зарегистрироваться
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "tween" }}
            className={`border-t border-border-light dark:border-border-dark overflow-hidden lg:hidden`}
          >
            <div className={"p-4 flex flex-col gap-4"}>
              {navDataLinks.map((link) => {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      "text-sm font-medium text-muted-light-foreground dark:text-muted-dark-foreground"
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className={"flex flex-col gap-3"}>
                <Link href={"/login"} className={"w-full flex"}>
                  <Button
                    className={
                      "w-full bg-background-light dark:bg-input-dark/30 border border-border-light" +
                      " dark:border-border-dark" +
                      " py-2 text-sm font-medium"
                    }
                  >
                    Вход
                  </Button>
                </Link>
                <Link href={"/register"} className={"w-full flex"}>
                  <Button
                    className={
                      "w-full text-sm py-2 font-medium bg-primary-light dark:bg-primary-dark" +
                      " text-primary-light-foreground" +
                      " dark:text-primary-dark-foreground"
                    }
                  >
                    Зарегистрироваться
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
