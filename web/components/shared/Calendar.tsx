import { Dispatch, SetStateAction } from "react";
import { MonthInformation } from "@/components/shared/dashboard/panels/action";
import { DirectionArrowIcon } from "@/components/icons";

export default function Calendar({
  month,
  year,
  setMonthYear,
  attendanceMonth,
}: {
  month: number;
  year: number;
  setMonthYear: Dispatch<
    SetStateAction<{
      month: number;
      year: number;
    }>
  >;
  attendanceMonth: MonthInformation[];
}) {
  const startDate = new Date(year, month - 1);
  const endDate = new Date(year, month, 0);
  const formatterWeekDay = Intl.DateTimeFormat("ru-RU", { weekday: "short" });
  const formattingDate = Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1));
  const firstWeekDay = startDate.getDay() || 7;
  const countWeeks = Math.ceil((endDate.getDate() + firstWeekDay - 1) / 7);
  const marksSet = new Map<number, MonthInformation>(
    attendanceMonth.map((month: MonthInformation) => [
      new Date(month.createdAt).getTime(),
      month,
    ]),
  );
  return (
    <div className={"mx-auto "}>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-row gap-3 justify-between items-center"}>
          <button
            onClick={() =>
              setMonthYear((prevState) => {
                if (prevState.month - 1 < 1) {
                  return {
                    month: 12,
                    year: prevState.year - 1,
                  };
                }
                return {
                  month: prevState.month - 1,
                  year: prevState.year,
                };
              })
            }
            className={
              "rotate-180 w-8 aspect-square flex items-center justify-center cursor-pointer" +
              " transition-colors" +
              " duration-150 ease-in-out hover:bg-accent-light/50 dark:hover:bg-accent-dark/50 rounded-full" +
              " hover:text-accent-light-foreground dark:hover:text-accent-dark-foreground"
            }
          >
            <DirectionArrowIcon />
          </button>
          <p className={"select-none text-sm font-medium"}>
            {formattingDate.charAt(0).toUpperCase() +
              formattingDate.slice(1).replace("г.", "")}
          </p>
          <button
            onClick={() =>
              setMonthYear((prevState) => {
                if (prevState.month + 1 > 12) {
                  return {
                    month: 1,
                    year: prevState.year + 1,
                  };
                }
                return {
                  month: prevState.month + 1,
                  year: prevState.year,
                };
              })
            }
            className={
              "w-8 aspect-square flex items-center justify-center cursor-pointer transition-colors" +
              " duration-150 ease-in-out hover:bg-accent-light/50 dark:hover:bg-accent-dark/50 rounded-full" +
              " hover:text-accent-light-foreground dark:hover:text-accent-dark-foreground"
            }
          >
            <DirectionArrowIcon />
          </button>
        </div>
        <table className={"select-none flex flex-col text-sm"}>
          <thead
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            <tr className={"flex flex-row "}>
              {[...Array(7)].map((_, i) => {
                const weekDay = formatterWeekDay.format(
                  new Date(1970, 0, (4 + i + 1) % 7),
                );
                return (
                  <th
                    key={`weekDay-${i}`}
                    className={
                      "w-8 flex justify-center items-center aspect-square font-normal"
                    }
                  >
                    {weekDay.charAt(0).toUpperCase() + weekDay.slice(1)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={"flex flex-col"}>
            {[...Array(countWeeks)].map((_, indexWeek) => {
              return (
                <tr key={`week-${indexWeek}`} className={"flex flex-row"}>
                  {[...Array(7)].map((_, indexDay) => {
                    const offset =
                      startDate.getDay() === 0 ? 6 : startDate.getDay() - 1;
                    const dayNumber = indexWeek * 7 + indexDay - offset + 1;
                    const currentTimeStamp = new Date(
                      year,
                      month - 1,
                      dayNumber,
                    ).getTime();
                    const isMark = marksSet.has(currentTimeStamp);
                    const mark = marksSet.get(currentTimeStamp);
                    return (
                      <th
                        key={`day-${indexDay}`}
                        className={`w-8 flex justify-center items-center aspect-square font-normal ${isMark && mark?.mark === "came" ? "bg-mint-light-light dark:bg-mint-dark/20 text-mint-light dark:text-mint-dark" : mark?.mark === "sick" ? "bg-coral-light-light dark:bg-coral-dark/20 text-coral-light dark:text-coral-dark" : mark?.mark === "absent" ? "bg-sunshine-light-light dark:bg-sunshine-dark/20 text-sunshine-light dark:text-sunshine-dark" : ""}`}
                      >
                        {dayNumber > 0 &&
                          dayNumber < endDate.getDate() + 1 &&
                          dayNumber}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
