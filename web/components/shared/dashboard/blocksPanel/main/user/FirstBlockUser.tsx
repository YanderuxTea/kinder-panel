"use client";
import { useEffect, useState } from "react";
import {
  Children,
  getChildren,
} from "@/components/shared/dashboard/blocksPanel/main/user/action";
import UserAvatar from "@/components/shared/UserAvatar";

export default function FirstBlockUser() {
  const [children, setChildren] = useState<Children[]>([]);
  useEffect(() => {
    getChildren().then((res) => {
      setChildren(res.data);
    });
  }, []);
  function calculatedAge(birthDate: Date) {
    const today = new Date(Date.now());
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  return (
    <div className={"flex flex-col"}>
      <p
        className={
          "text-lg text-foreground-light dark:text-foreground-dark font-semibold"
        }
      >
        Ваши дети
      </p>
      <div
        className={`flex flex-col gap-2 h-100 overflow-y-auto mt-6 ${
          children.length === 0 && "justify-center" + " items-center"
        }`}
      >
        {children.length > 0 ? (
          children.map((child) => {
            return (
              <div
                key={child.id}
                className={
                  "border border-border-light dark:border-border-dark rounded-2xl" +
                  " p-3 flex flex-row justify-between gap-2"
                }
              >
                <div className={"flex flex-row gap-2 items-center"}>
                  <UserAvatar
                    size={"md"}
                    fullname={`${child.name} ${child.surname}`}
                  />
                  <div className={"flex flex-col font-medium"}>
                    <p
                      className={
                        "text-foreground-light dark:text-foreground-dark"
                      }
                    >
                      {child.name} {child.surname}
                    </p>
                    <p
                      className={
                        "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
                      }
                    >
                      Группа: {child.group.name} • Возраст:{" "}
                      {calculatedAge(new Date(child.dateOfBirth))}
                    </p>
                  </div>
                </div>
                <div className={"flex flex-col font-medium text-center"}>
                  <p
                    className={
                      "text-foreground-light dark:text-foreground-dark"
                    }
                  >
                    Отметка:
                  </p>
                  {child.attendances.length > 0 ? (
                    new Date(child.attendances[0].createdAt).setHours(
                      0,
                      0,
                      0,
                      0,
                    ) === new Date(Date.now()).setHours(0, 0, 0, 0) ? null : (
                      <p
                        className={
                          "text-muted-light-foreground" +
                          " dark:text-muted-dark-foreground text-sm"
                        }
                      >
                        Сегодня не отмечали
                      </p>
                    )
                  ) : (
                    <p
                      className={
                        "text-muted-light-foreground" +
                        " dark:text-muted-dark-foreground text-sm"
                      }
                    >
                      Отметок еще нет
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
            }
          >
            Еще не добавили детей. Ожидайте
          </p>
        )}
      </div>
    </div>
  );
}
