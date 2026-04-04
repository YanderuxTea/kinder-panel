"use client";
import { useEffect, useState } from "react";
import { getNutrition, NutritionUser } from "@/components/shared/dashboard/blocksPanel/main/user/action";

export default function SecondBlockUser() {
  const [nutrition, setNutrition] = useState<NutritionUser | null>(null);
  useEffect(() => {
    getNutrition().then((res) => {
      setNutrition(res.data);
    });
  }, []);
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const nutritionTime = ["Завтрак", "Второй завтрак", "Обед", "Полдник"];
  const dayWeek = days[new Date().getDay()];
  function calculatedNutritionTime(times: string[]) {
    const startTime: string[] = [];
    const endTime: string[] = [];
    times.map((time) => {
      const splitTime = time.split("-");
      for (let i = 0; i < splitTime.length; i++) {
        if ((i + 1) % 2 !== 0) {
          startTime.push(splitTime[i]);
        } else {
          endTime.push(splitTime[i]);
        }
      }
    });
    const nowHour = new Date().getHours();
    const nowMinute = new Date().getMinutes();
    const nowTotalMinutes = nowHour * 60 + nowMinute;
    function calculatedIndexTime() {
      for (let i = 0; i < startTime.length; i++) {
        const splitStartTime = startTime[i].split(":");
        const startHour = Number(splitStartTime[0]);
        const startMinute = Number(splitStartTime[1]);
        const startTotalMinutes = startHour * 60 + startMinute;
        const splitEndTime = endTime[i].split(":");
        const endHour = Number(splitEndTime[0]);
        const endMinute = Number(splitEndTime[1]);
        const endTotalMinutes = endHour * 60 + endMinute;
        if (
          nowTotalMinutes >= startTotalMinutes &&
          nowTotalMinutes <= endTotalMinutes
        ) {
          return { near: false, index: i };
        }
        if (nowTotalMinutes < startTotalMinutes) {
          const diffHour = Math.floor(
            (startTotalMinutes - nowTotalMinutes) / 60,
          );

          const diffMinute = (startTotalMinutes - nowTotalMinutes) % 60;
          const splitEndTimePrev = i > 0 ? endTime[i - 1].split(":") : 0;
          const prevEndMinute = i > 0 ? Number(splitEndTimePrev[1]) : 0;
          const prevEndHour = i > 0 ? Number(splitEndTimePrev[0]) : 0;
          const prevEndTotalMinutes = prevEndHour * 60 + prevEndMinute;
          const diffTimes = startTotalMinutes - prevEndTotalMinutes;
          const diffStartCurrentTimes = nowTotalMinutes - prevEndTotalMinutes;
          const percent = (diffStartCurrentTimes / diffTimes) * 100;
          return { near: true, index: i, diffHour, diffMinute, percent };
        }
      }
      return null;
    }

    const indexTime = calculatedIndexTime();
    if (!indexTime) {
      return {
        near: false,
        nutritionTime: "На сегодня больше нет приема пищи",
        endDay: true,
      };
    }
    const food = {
      0: nutrition?.breakfast,
      1: nutrition?.secondBreakfast,
      2: nutrition?.lunch,
      3: nutrition?.afternoonSnack,
    };
    const time = {
      0: nutrition?.breakfastTime,
      1: nutrition?.secondBreakfastTime,
      2: nutrition?.lunchTime,
      3: nutrition?.afternoonSnackTime,
    };
    return {
      nutritionTime: nutritionTime[indexTime.index],
      near: indexTime.near,
      food: food[indexTime.index as 0 | 1 | 2 | 3],
      time: time[indexTime.index as 0 | 1 | 2 | 3],
      diffMinute: indexTime.diffMinute,
      diffHour: indexTime.diffHour,
      percent: indexTime.percent,
    };
  }
  return (
    <div className={"flex flex-col"}>
      <p
        className={
          "text-lg text-foreground-light dark:text-foreground-dark font-semibold"
        }
      >
        Питание
      </p>
      <div className={"h-50 flex"}>
        <div className={"flex flex-col mt-6 gap-2 flex-1"}>
          <p
            className={
              "text-2xl font-semibold text-foreground-light dark:text-foreground-dark"
            }
          >
            {dayWeek}
          </p>
          {nutrition ? (
            <div className={"flex flex-col gap-3 mt-4"}>
              <div className={"flex flex-col gap-3"}>
                <div className={"flex flex-row justify-between gap-2"}>
                  <p
                    className={
                      "bg-input-light/50 dark:bg-input-dark/50 px-2 rounded-full py-1 text-sm font-medium" +
                      " text-foreground-light dark:text-foreground-dark"
                    }
                  >
                    {
                      calculatedNutritionTime([
                        nutrition.breakfastTime,
                        nutrition.secondBreakfastTime,
                        nutrition.lunchTime,
                        nutrition.afternoonSnackTime,
                      ]).nutritionTime
                    }
                  </p>
                  <p
                    className={
                      "text-sm text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
                    }
                  >
                    {
                      calculatedNutritionTime([
                        nutrition.breakfastTime,
                        nutrition.secondBreakfastTime,
                        nutrition.lunchTime,
                        nutrition.afternoonSnackTime,
                      ]).time
                    }
                  </p>
                </div>
                <p
                  className={
                    "font-medium text-foreground-light dark:text-foreground-dark"
                  }
                >
                  {
                    calculatedNutritionTime([
                      nutrition.breakfastTime,
                      nutrition.secondBreakfastTime,
                      nutrition.lunchTime,
                      nutrition.afternoonSnackTime,
                    ]).food
                  }
                </p>
              </div>
              {calculatedNutritionTime([
                nutrition.breakfastTime,
                nutrition.secondBreakfastTime,
                nutrition.lunchTime,
                nutrition.afternoonSnackTime,
              ]).endDay ? null : (
                <div className={"flex flex-col gap-2"}>
                  {calculatedNutritionTime([
                    nutrition.breakfastTime,
                    nutrition.secondBreakfastTime,
                    nutrition.lunchTime,
                    nutrition.afternoonSnackTime,
                  ]).near ? (
                    <>
                      <div className={"flex flex-row justify-between gap-2"}>
                        <p
                          className={
                            "text-sm font-medium text-muted-light-foreground dark:text-muted-dark-foreground"
                          }
                        >
                          Время до{" "}
                          {calculatedNutritionTime([
                            nutrition.breakfastTime,
                            nutrition.secondBreakfastTime,
                            nutrition.lunchTime,
                            nutrition.afternoonSnackTime,
                          ]).nutritionTime.toLowerCase()}
                          а
                        </p>
                        <p
                          className={
                            "text-sm font-medium text-foreground-light dark:text-foreground-dark"
                          }
                        >
                          {calculatedNutritionTime([
                            nutrition.breakfastTime,
                            nutrition.secondBreakfastTime,
                            nutrition.lunchTime,
                            nutrition.afternoonSnackTime,
                          ]).diffHour! > 0
                            ? calculatedNutritionTime([
                                nutrition.breakfastTime,
                                nutrition.secondBreakfastTime,
                                nutrition.lunchTime,
                                nutrition.afternoonSnackTime,
                              ]).diffHour + "ч "
                            : null}
                          {calculatedNutritionTime([
                            nutrition.breakfastTime,
                            nutrition.secondBreakfastTime,
                            nutrition.lunchTime,
                            nutrition.afternoonSnackTime,
                          ]).diffMinute + "мин"}
                        </p>
                      </div>
                      <div
                        className={
                          "bg-primary-light/20 dark:bg-primary-dark/20 w-full h-2 rounded-full relative" +
                          " overflow-hidden"
                        }
                      >
                        <div
                          style={{
                            transform: `translateX(-${
                              100 -
                              calculatedNutritionTime([
                                nutrition.breakfastTime,
                                nutrition.secondBreakfastTime,
                                nutrition.lunchTime,
                                nutrition.afternoonSnackTime,
                              ]).percent!
                            }%)`,
                          }}
                          className={`absolute inset-0 bg-primary-light dark:bg-primary-dark rounded-full`}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p
                        className={
                          "text-sm font-medium text-muted-light-foreground dark:text-muted-dark-foreground"
                        }
                      >
                        Сейчас{" "}
                        {calculatedNutritionTime([
                          nutrition.breakfastTime,
                          nutrition.secondBreakfastTime,
                          nutrition.lunchTime,
                          nutrition.afternoonSnackTime,
                        ]).nutritionTime.toLowerCase()}
                      </p>
                      <div
                        className={
                          "h-2 w-full rounded-full bg-primary-light dark:bg-primary-dark"
                        }
                      ></div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className={"flex-1 flex justify-center items-center"}>
              <p
                className={
                  "text-muted-light-foreground dark:text-muted-dark-foreground font-medium"
                }
              >
                На сегодня нет расписания
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
