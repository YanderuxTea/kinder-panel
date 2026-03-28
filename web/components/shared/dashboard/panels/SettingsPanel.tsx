"use client";
import { motion } from "framer-motion";
import { PaletteIcon, PeopleIcon, ShieldIcon } from "@/components/icons";
import UserAvatar from "@/components/shared/UserAvatar";
import UserRoleConverter from "@/components/shared/dashboard/UserRoleConverter";
import { RolesType } from "@/proxy";
import SettingsForm from "@/components/forms/panels/SettingsForm";
import { useEffect, useState } from "react";
import { getDataForSettings } from "@/components/shared/dashboard/panels/action";
import { useTheme } from "next-themes";
import ChangePasswordForm from "@/components/forms/panels/ChangePasswordForm";

export type DataSettings = {
  email: string;
  tel: string;
  address: string;
};
export default function SettingsPanel({
  fullname,
  role,
  login,
}: {
  fullname: string;
  role: RolesType;
  login: string;
}) {
  const [data, setData] = useState<DataSettings>({
    email: "Загрузка",
    tel: "Загрузка",
    address: "Загрузка",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res: { data: DataSettings } = await getDataForSettings();
      return res;
    };
    fetchData().then((r) => setData(r.data));
  }, []);
  const { setTheme } = useTheme();

  return (
    <div className={"flex flex-col"}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={"flex flex-col gap-1 mb-8"}
      >
        <h1
          className={
            "text-foreground-light dark:text-foreground-dark text-2xl lg:text-3xl font-bold"
          }
        >
          Настройки
        </h1>
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          Управляйте своей учетной записью{" "}
        </p>
      </motion.div>
      <div className="grid grid-cols-1 grid-rows-[auto_auto_auto] lg:grid-cols-3 lg:grid-rows-[auto_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
          className={
            "flex flex-col border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark" +
            " rounded-3xl p-6 w-full shrink-0 lg:col-span-2 lg:row-span-2"
          }
        >
          <div className={"flex flex-col gap-1 "}>
            <p
              className={
                "inline-flex gap-2 flex-row items-center font-semibold text-foreground-light" +
                " dark:text-foreground-dark"
              }
            >
              <span
                className={
                  "text-muted-light-foreground dark:text-muted-dark-foreground"
                }
              >
                <PeopleIcon size={"md"} />
              </span>{" "}
              Информация профиля
            </p>
            <p
              className={
                "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              Обновите вашу личную информацию
            </p>
          </div>
          <div className={"flex flex-row my-6 gap-6"}>
            <UserAvatar size={"lg"} fullname={fullname} />
            <div className={"flex flex-col "}>
              <p
                className={
                  "font-medium text-foreground-light dark:text-foreground-dark"
                }
              >
                {fullname}
              </p>
              <UserRoleConverter
                roleConst={role}
                className={
                  "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
                }
              />
            </div>
          </div>
          <div
            className={
              "border-t border-border-light dark:border-border-dark pt-6"
            }
          >
            <SettingsForm
              setDataSettings={setData}
              fullname={fullname}
              email={data.email}
              tel={data.tel}
              address={data.address}
            />
          </div>
        </motion.div>
        <motion.div
          className={
            "border border-border-light dark:border-border-dark p-6 bg-card-light dark:bg-card-dark rounded-2xl" +
            " w-full flex flex-col gap-6"
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", delay: 0.4 }}
        >
          <p
            className={
              "inline-flex flex-row gap-2 font-medium text-foreground-light dark:text-foreground-dark items-center"
            }
          >
            <PaletteIcon /> Внешний вид
          </p>
          <div className={"flex flex-col gap-4"}>
            <p className={"text-sm font-medium"}>Тема</p>
            <div className={"grid grid-cols-2 gap-2"}>
              <div
                onClick={() => setTheme("light")}
                className={
                  "border-2 p-3 flex justify-center border-primary-light dark:border-border-dark" +
                  ` items-center rounded-3xl flex-col gap-2 select-none`
                }
              >
                <div
                  className={"rounded-full bg-white w-8 h-8 shadow-md"}
                ></div>
                <p
                  className={
                    "text-xs text-foreground-light dark:text-foreground-dark"
                  }
                >
                  Светлая
                </p>
              </div>
              <div
                onClick={() => setTheme("dark")}
                className={
                  "border-2 p-3 flex justify-center border-border-light dark:border-primary-dark" +
                  ` items-center rounded-3xl flex-col gap-2 select-none`
                }
              >
                <div className={"rounded-full bg-slate-800 w-8 h-8"}></div>
                <p
                  className={
                    "text-xs text-foreground-light dark:text-foreground-dark"
                  }
                >
                  Темная
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className={
            "border border-border-light dark:border-border-dark p-6 bg-card-light dark:bg-card-dark rounded-2xl" +
            " w-full flex flex-col gap-6"
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", delay: 0.6 }}
        >
          <p
            className={
              "inline-flex flex-row gap-2 font-medium text-foreground-light dark:text-foreground-dark items-center"
            }
          >
            <span
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              <ShieldIcon size={"md"} />
            </span>{" "}
            Безопасность
          </p>
          <ChangePasswordForm login={login} />
        </motion.div>
      </div>
    </div>
  );
}
