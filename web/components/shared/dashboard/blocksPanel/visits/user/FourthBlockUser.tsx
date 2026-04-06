import { DocumentIcon } from "@/components/icons";
import { MonthInformation } from "@/components/shared/dashboard/panels/action";
import { Virtuoso } from "react-virtuoso";
import { getAttendanceConfig } from "@/hook/getAttendanceConfig";

export default function FourthBlockUser({
  selectChildId,
  fetchMore,
  history,
  hasMore,
}: {
  hasMore: boolean;
  fetchMore: () => void;
  history: MonthInformation[];
  selectChildId: string;
}) {
  const formatter = Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <div className={"flex flex-col gap-6"}>
      <p
        className={
          "text-foreground-light dark:text-foreground-dark font-semibold text-lg flex flex-row gap-2 items-center"
        }
      >
        <span
          className={
            "text-muted-light-foreground dark:text-muted-dark-foreground"
          }
        >
          <DocumentIcon />
        </span>
        История посещаемости
      </p>
      {selectChildId.length > 0 ? (
        <div
          className={`h-100 flex ${history.length === 0 && "justify-center items-center"}`}
        >
          {history.length === 0 ? (
            <p
              className={
                "font-medium text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              Истории еще нет
            </p>
          ) : (
            <Virtuoso
              className={"w-full select-none"}
              style={{ height: "100%" }}
              totalCount={history.length}
              data={history}
              endReached={hasMore ? fetchMore : undefined}
              itemContent={(_, data) => {
                const rawDate = formatter.format(new Date(data.createdAt));
                const parts = rawDate.split(" ");
                const formattedDate = parts
                  .map((part, index) => {
                    if (index === 0) {
                      return part.charAt(0).toUpperCase() + part.slice(1);
                    }
                    if (index === 2) {
                      return (
                        part.charAt(0).toUpperCase() +
                        part.slice(1).replace(".", "")
                      );
                    }
                    return part;
                  })
                  .join(" ");
                const attendanceConfig = getAttendanceConfig(data.mark, "md");
                return (
                  <div
                    key={new Date(data.createdAt).toString()}
                    className={`my-3 ${attendanceConfig.color} flex flex-row justify-between items-center p-3 rounded-3xl`}
                  >
                    <div className={"flex flex-row gap-3 items-center"}>
                      {attendanceConfig.icon}
                      <p
                        className={
                          "font-medium text-foreground-light dark:text-foreground-dark"
                        }
                      >
                        {formattedDate}
                      </p>
                    </div>
                    <div
                      className={
                        "rounded-full text-xs py-0.5 px-2 text-secondary-light-foreground" +
                        " dark:text-secondary-dark-foreground bg-secondary-light dark:bg-secondary-dark"
                      }
                    >
                      {attendanceConfig.text}
                    </div>
                  </div>
                );
              }}
            />
          )}
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
