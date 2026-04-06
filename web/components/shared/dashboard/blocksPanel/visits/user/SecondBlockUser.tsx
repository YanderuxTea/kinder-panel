import { MonthInformation } from "@/components/shared/dashboard/panels/action";
import { Dispatch, SetStateAction } from "react";
import Calendar from "@/components/shared/Calendar";

export default function SecondBlockUser({
  selectChildId,
  attendanceMonth,
  setMonthYear,
  monthYear,
}: {
  monthYear: { year: number; month: number };
  attendanceMonth: MonthInformation[];
  setMonthYear: Dispatch<SetStateAction<{ year: number; month: number }>>;
  selectChildId: string;
}) {
  return (
    <div className={"flex flex-col gap-6"}>
      <p
        className={
          "text-foreground-light dark:text-foreground-dark font-semibold text-lg"
        }
      >
        Календарь посещаемости
      </p>
      {selectChildId.length > 0 ? (
        <div className={"flex flex-col gap-6"}>
          <Calendar
            month={monthYear.month}
            year={monthYear.year}
            setMonthYear={setMonthYear}
            attendanceMonth={attendanceMonth}
          />
          <div
            className={
              "pt-3 border-t border-border-light dark:border-border-dark flex flex-row justify-center items-center" +
              " gap-3"
            }
          >
            <div
              className={
                "items-center gap-2 flex flex-row text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              <div
                className={
                  "w-3 h-3 rounded-full bg-mint-light-light dark:bg-mint-dark/20"
                }
              ></div>
              <span>Посещает</span>
            </div>
            <div
              className={
                "items-center gap-2 flex flex-row text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              <div
                className={
                  "w-3 h-3 rounded-full bg-coral-light-light dark:bg-coral-dark/20"
                }
              ></div>
              <span>Болен</span>
            </div>
            <div
              className={
                "items-center gap-2 flex flex-row text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              <div
                className={
                  "w-3 h-3 rounded-full bg-sunshine-light-light dark:bg-sunshine-dark/20"
                }
              ></div>
              <span>Отсутствует</span>
            </div>
          </div>
        </div>
      ) : (
        <p
          className={
            "text-center font-medium text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          Выберите ребенка
        </p>
      )}
    </div>
  );
}
