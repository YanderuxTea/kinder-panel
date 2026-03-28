import Link from "next/link";
import SwitcherThemeButton from "@/components/shared/SwitcherThemeButton";

export default function HeaderAuth() {
  return (
    <header
      className={
        "absolute top-0 inset-x-0 w-full p-5 text-sm flex flex-row justify-between items-center"
      }
    >
      <Link
        href="/"
        className={
          "flex flex-row text-muted-light-foreground dark:text-muted-dark-foreground" +
          " transition-colors duration-150 ease-in-out hover:text-foreground-light dark:hover:text-foreground-dark"
        }
      >
        На главную
      </Link>
      <SwitcherThemeButton />
    </header>
  );
}
