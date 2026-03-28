import { motion } from "framer-motion";
import { LogoutIcon, SettingsIcon } from "@/components/icons";
import Link from "next/link";
import { RefObject } from "react";
import { logoutUser } from "@/components/shared/dashboard/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AccountMenu({
  refMenu,
}: {
  refMenu: RefObject<HTMLDivElement | null>;
}) {
  const router = useRouter();
  async function handleLogout() {
    const res = await logoutUser();
    if (res.ok) {
      router.replace("/");
    } else {
      toast.error("Произошла неизвестная ошибка");
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15, type: "tween" }}
      ref={refMenu}
      className={
        "bg-popover-light dark:bg-popover-dark border border-border-light dark:border-border-dark" +
        " rounded-[20px] absolute bottom-0 translate-y-full w-56 -translate-x-4/5 text-sm flex flex-col" +
        " items-start text-foreground-light dark:text-foreground-dark shadow-md cursor-default"
      }
    >
      <div
        className={
          "p-3 w-full text-left border-b border-border-light dark:border-border-dark"
        }
      >
        <p>Мой аккаунт</p>
      </div>
      <div className={"p-1 w-full text-left"}>
        <Link
          href={"/dashboard/settings"}
          className={
            "flex flex-row items-center gap-4 transition-colors duration-150 ease-in-out" +
            " hover:text-accent-light-foreground dark:hover:text-accent-dark-foreground" +
            " hover:bg-accent-light dark:hover:bg-accent-dark rounded-full p-2"
          }
        >
          <span
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            <SettingsIcon size={"sm"} />
          </span>
          Настройки
        </Link>
      </div>
      <div
        className={
          "p-1 w-full text-left border-t border-border-light dark:border-border-dark "
        }
      >
        <div
          onClick={() => handleLogout()}
          className={
            "flex flex-row items-center gap-4 text-destructive-light dark:text-destructive-dark duration-150" +
            " ease-in-out hover:text-accent-light-foreground dark:hover:text-accent-dark-foreground" +
            " transition-colors cursor-pointer hover:bg-accent-light dark:hover:bg-accent-dark rounded-full p-2"
          }
        >
          <span
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            <LogoutIcon />
          </span>
          Выйти
        </div>
      </div>
    </motion.div>
  );
}
