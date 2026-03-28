import Link from "next/link";
import { LogoIcon } from "@/components/icons";

type Props = {
  isHideName?: boolean;
};
export default function Logo({ isHideName }: Props) {
  return (
    <Link
      href="/"
      className={
        "text-xl text-foreground-light dark:text-foreground-dark flex flex-row items-center gap-2 font-bold"
      }
    >
      <div
        className={
          "bg-primary-light w-10 aspect-square rounded-full flex items-center justify-center"
        }
      >
        <LogoIcon />
      </div>
      {!isHideName && "Киндер"}
    </Link>
  );
}
