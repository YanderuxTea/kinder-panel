import { cardInPreviewData } from "@/data/CardInPreviewData";
import CardNotifyPreview from "@/components/shared/main/sections/CardNotifyPreview";
import { CheckMark } from "@/components/icons";
import { motion } from "framer-motion";

export default function PreviewInHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "tween", delay: 0.4 }}
      className={
        "relative flex flex-col w-full p-2 bg-card-light dark:bg-card-dark mt-16 rounded-3xl " +
        " border" +
        " border-border-light dark:border-border-dark max-w-5xl mx-auto"
      }
    >
      <div
        className={"flex flex-col rounded-2xl overflow-hidden h-100 lg:h-125"}
      >
        <div
          className={
            "flex flex-row justify-between px-6 py-4 border-b border-border-light dark:border-border-dark"
          }
        >
          <div className={"flex flex-row gap-3 items-center"}>
            <div
              className={
                "bg-primary-light dark:bg-primary-dark rounded-full w-8 h-8"
              }
            ></div>
            <div
              className={
                "rounded-full w-24 h-4 bg-muted-light-foreground/20 dark:bg-muted-dark-foreground/20"
              }
            ></div>
          </div>
          <div className={"flex flex-row gap-3 items-center"}>
            <div
              className={
                "bg-mint-light-light dark:bg-mint-dark-light rounded-full w-8 h-8"
              }
            ></div>
            <div
              className={
                "rounded-full w-16 h-4 bg-muted-light-foreground/20 dark:bg-muted-dark-foreground/20"
              }
            ></div>
          </div>
        </div>
        <div className={"flex flex-row flex-1"}>
          <div
            className={
              "hidden w-56 h-full border-r border-border-light dark:border-border-dark p-4 lg:flex flex-col"
            }
          >
            {[...Array(5)].map((_, i) => {
              return (
                <div
                  key={i + "sideBarCardPreview"}
                  className={
                    "flex flex-row gap-3 p-3 items-center" +
                    ` rounded-[20px] ${i === 0 && "bg-primary-light/10 dark:bg-primary-dark/10"}"`
                  }
                >
                  <div
                    className={`w-5 h-5 rounded-full  ${
                      i === 0
                        ? "bg-primary-light dark:bg-primary-dark"
                        : "bg-muted-light-foreground/20" +
                          " dark:bg-muted-dark-foreground/20 "
                    } `}
                  ></div>
                  <div
                    className={`h-3 rounded-sm ${
                      i === 0
                        ? "bg-primary-light dark:bg-primary-dark w-20"
                        : "bg-muted-light-foreground/20 w-15" +
                          " dark:bg-muted-dark-foreground/20"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
          <div
            className={
              "flex flex-col overflow-hidden p-6 bg-background-light dark:bg-background-dark flex-1"
            }
          >
            <div className={"flex flex-col mb-6 gap-4 sm:flex-row"}>
              {cardInPreviewData.map((card) => {
                return (
                  <div
                    key={card.backgroundColor}
                    className={`flex flex-col gap-2 ${card.backgroundColor} p-4 rounded-3xl w-full`}
                  >
                    <div
                      className={`${card.secondaryColor} w-20 h-3 rounded-sm`}
                    ></div>
                    <div
                      className={`${card.mainColor} rounded-2xl w-12 h-6`}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div
              className={`flex flex-col gap-3 p-4 h-32 rounded-3xl bg-card-light dark:bg-card-dark`}
            >
              <div
                className={`w-20 h-3 rounded-sm bg-muted-light-foreground/20 dark:bg-muted-dark-foreground/20`}
              ></div>
              <div className={"flex flex-col gap-2"}>
                <div
                  className={`rounded-sm h-3 w-full bg-muted-light-foreground/10 dark:bg-muted-dark-foreground/10`}
                ></div>
                <div
                  className={
                    "rounded-sm h-3 w-3/4 bg-muted-light-foreground/10 dark:bg-muted-dark-foreground/10"
                  }
                ></div>
                <div
                  className={
                    "rounded-sm h-3 w-1/2 bg-muted-light-foreground/10 dark:bg-muted-dark-foreground/10"
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardNotifyPreview
        title={"Посещаемость зафиксирована"}
        description={"Александр прибыл в 8:30"}
        colorIcons={"bg-mint-light-light dark:bg-mint-dark-light"}
        contentIcon={<CheckMark size={"md"} />}
        positon={"-left-4 top-1/4"}
        positive={true}
        delay={0.6}
      />
      <CardNotifyPreview
        title={"Время обеда"}
        description={"Паста и овощи"}
        colorIcons={
          "bg-sunshine-light-light dark:bg-sunshine-dark-light text-lg"
        }
        contentIcon={"🍎"}
        positon={"-right-4 bottom-1/3"}
        positive={false}
        delay={0.8}
      />
    </motion.div>
  );
}
