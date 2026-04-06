import { MonthInformation } from "@/components/shared/dashboard/panels/action";

export default function ThirdBlockUser({
  selectChildId,
  monthAttendance,
}: {
  monthAttendance: MonthInformation[];
  selectChildId: string;
}) {
  const splitAttendance = monthAttendance.reduce(
    (acc, curr) => {
      acc[curr.mark] = acc[curr.mark] + 1;
      return acc;
    },
    { sick: 0, absent: 0, came: 0 },
  );
  const percent = (splitAttendance.came / monthAttendance.length) * 100 || 0;
  return (
    <div className={"flex flex-col gap-6"}>
      <p
        className={
          "text-lg font-semibold text-foreground-light dark:text-foreground-dark"
        }
      >
        Обзор за месяц
      </p>
      {selectChildId.length > 0 ? (
        <div className={"grid grid-cols-2 gap-3 grid-rows-[1fr_1fr]"}>
          <div
            className={
              "flex justify-center items-center p-4 rounded-3xl bg-mint-light-light/50 dark:bg-mint-dark/10" +
              " text-mint-light dark:text-mint-dark flex-col text-center"
            }
          >
            <p className={"text-2xl font-bold"}>{splitAttendance.came}</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground text-xs"
              }
            >
              Дни присутствия
            </p>
          </div>
          <div
            className={
              "flex justify-center items-center p-4 rounded-3xl bg-coral-light-light/50 dark:bg-coral-dark/10" +
              " text-coral-light dark:text-coral-dark flex-col text-center"
            }
          >
            <p className={"text-2xl font-bold"}>{splitAttendance.sick}</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground text-xs"
              }
            >
              Дни болезни
            </p>
          </div>
          <div
            className={
              "flex justify-center items-center p-4 rounded-3xl bg-sunshine-light-light/50" +
              " dark:bg-sunshine-dark/10 text-sunshine-light dark:text-sunshine-dark flex-col text-center"
            }
          >
            <p className={"text-2xl font-bold"}>{splitAttendance.absent}</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground text-xs"
              }
            >
              Отсутствие
            </p>
          </div>
          <div
            className={
              "flex justify-center items-center p-4 rounded-3xl bg-sky-light-light/50 dark:bg-sky-dark/10" +
              " text-sky-light dark:text-sky-dark flex-col text-center"
            }
          >
            <p className={"text-2xl font-bold"}>{percent}%</p>
            <p
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground text-xs"
              }
            >
              Уровень посещаемости
            </p>
          </div>
        </div>
      ) : (
        <p
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground" +
            " font-medium text-center"
          }
        >
          Выберите ребенка
        </p>
      )}
    </div>
  );
}
