"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@/components/icons";

export default function SwitcherThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();
  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      onClick={() => toggleTheme()}
      className={
        "w-9 h-9 rounded-full transition-colors duration-150 " +
        "ease-in-out hover:bg-accent-light dark:hover:bg-accent-light/50 flex items-center justify-center shrink-0 " +
        "cursor-pointer"
      }
    >
      <div className={"hidden dark:block"}>
        <Sun />
      </div>
      <div className={"dark:hidden block"}>
        <Moon />
      </div>
    </button>
  );
}
