"use client";

import SwitcherThemeButton from "@/components/shared/SwitcherThemeButton";
import NotificationButton from "@/components/shared/NotificationButton";
import UserAvatar from "@/components/shared/UserAvatar";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AccountMenu from "@/components/shared/dashboard/AccountMenu";

export default function HeaderDashboard({ fullname }: { fullname: string }) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openNotifyPanel, setOpenNotifyPanel] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleToggleMenu(e: Event) {
      const target = e.target as Node;
      if (buttonRef.current === target) {
        setOpenMenu((prevState) => !prevState);
        return;
      }
      if (
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpenMenu(false);
      }
    }
    window.addEventListener("click", handleToggleMenu);
    return () => {
      window.removeEventListener("click", handleToggleMenu);
    };
  }, []);
  return (
    <header
      className={
        "sticky top-0 px-4 lg:px-10 border-b border-border-light dark:border-border-dark" +
        " backdrop-blur bg-background-light/60 dark:bg-background-dark/60 flex flex-row justify-end gap-4 h-16" +
        " items-center z-50"
      }
    >
      <SwitcherThemeButton />
      <NotificationButton
        openNotifyPanel={openNotifyPanel}
        setOpenNotifyPanelAction={setOpenNotifyPanel}
      />
      <div
        ref={buttonRef}
        className={
          "p-1.25 select-none rounded-full transition-colors duration-150 ease-in-out hover:bg-accent-light" +
          ` dark:hover:bg-accent-dark/50 cursor-pointer relative ${openMenu && "bg-accent-light dark:bg-accent-dark/50"}`
        }
      >
        <UserAvatar size={"sm"} fullname={fullname} />
        <AnimatePresence>
          {openMenu && <AccountMenu refMenu={menuRef} />}
        </AnimatePresence>
      </div>
    </header>
  );
}
