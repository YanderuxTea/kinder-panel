import { BurgerMenuIcon, XIcon } from "@/components/icons";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpenMenu: boolean;
}
export default function BurgerMenuButton({ isOpenMenu, ...props }: Props) {
  return (
    <button
      {...props}
      className={
        "group cursor-pointer transition-colors duration-150 ease-in-out hover:bg-accent-light" +
        " dark:hover:bg-accent-light/50 w-9 h-9 shrink-0 flex items-center justify-center rounded-full lg:hidden"
      }
    >
      {isOpenMenu ? <XIcon /> : <BurgerMenuIcon />}
    </button>
  );
}
