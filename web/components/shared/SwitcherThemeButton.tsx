"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@/components/icons";
import { useEffect, useState } from "react";

export default function SwitcherThemeButton() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  function toggleTheme() {
    switch (theme) {
      case "dark":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
    }
  }
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  const iconTheme =
    theme === "dark" ? <Sun /> : theme === "light" ? <Moon /> : null;
  if (!isMounted) return <div className={"w-9 h-9"}></div>;

  return (
    <button
      onClick={() => toggleTheme()}
      className={
        "w-9 h-9 rounded-full transition-colors duration-150 " +
        "ease-in-out hover:bg-accent-light dark:hover:bg-accent-light/50 flex items-center justify-center shrink-0 " +
        "cursor-pointer"
      }
    >
      {iconTheme}
    </button>
  );
}
