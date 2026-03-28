"use client";
import { BellIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
  setOpenNotifyPanelAction: Dispatch<SetStateAction<boolean>>;
  openNotifyPanel: boolean;
};
export default function NotificationButton({
  setOpenNotifyPanelAction,
  openNotifyPanel,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleToggleMenu(e: Event) {
      const target = e.target as Node;
      if (target === containerRef.current) {
        setOpenNotifyPanelAction((prevState) => !prevState);
        return;
      }
      if (
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpenNotifyPanelAction(false);
      }
    }
    window.addEventListener("click", handleToggleMenu);
    return () => {
      window.removeEventListener("click", handleToggleMenu);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className={
        "w-9 h-9 rounded-full transition-colors duration-150 " +
        `ease-in-out hover:bg-accent-light dark:hover:bg-accent-light/50 ${
          openNotifyPanel
            ? "bg-accent-light" +
              " dark:bg-accent-light/50 text-accent-light-foreground dark:text-accent-dark-foreground "
            : "text-foreground-light dark:text-foreground-dark"
        } flex items-center justify-center shrink-0` +
        " cursor-pointer  hover:text-accent-light-foreground" +
        "  dark:hover:text-accent-dark-foreground relative"
      }
    >
      {/*<div*/}
      {/*  className={*/}
      {/*    "absolute pointer-events-none w-2 h-2 rounded-full top-1 right-1 bg-coral-light" +*/}
      {/*    " dark:bg-coral-dark"*/}
      {/*  }*/}
      {/*></div>*/}
      <BellIcon size={"sm"} />
      <AnimatePresence>
        {openNotifyPanel && (
          <motion.div
            className={
              "absolute bottom-0 z-30 translate-y-full cursor-default bg-popover-light dark:bg-popover-dark" +
              " rounded-[20px] border border-border-light dark:border-border-dark flex flex-col h-100 w-75" +
              " -translate-x-1/5 text-foreground-light dark:text-foreground-dark select-none"
            }
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            ref={menuRef}
          >
            <div
              className={
                "flex flex-row justify-between border-b border-border-light dark:border-border-dark p-3"
              }
            >
              <p className={"font-medium"}>Центр уведомлений</p>
              <button
                className={
                  "text-xs text-muted-light-foreground dark:text-muted-dark-foreground font-medium cursor-pointer" +
                  " transition-colors duration-150 ease-in-out hover:text-foreground-light dark:hover:text-foreground-dark"
                }
              >
                Очистить все
              </button>
            </div>
            <div className={"flex flex-1 items-center justify-center "}>
              <p
                className={
                  "text-sm text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
                }
              >
                Уведомлений нет
              </p>
            </div>
            {/*<Virtuoso />*/}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
