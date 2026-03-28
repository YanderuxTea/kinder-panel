import Logo from "@/components/shared/Logo";
import { sectionListData } from "@/data/SectionListData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className={
        "px-4 py-12 lg:py-16 border-t border-border-light dark:border-border-dark" +
        " bg-muted-light/30" +
        " dark:bg-muted-dark/30"
      }
    >
      <div className={"mx-auto max-w-7xl"}>
        <div className={"grid gap-8 lg:grid-cols-6"}>
          <div className={"flex flex-col gap-4 lg:col-span-2"}>
            <Logo />
            <p
              className={
                "text-sm text-muted-light-foreground dark:text-muted-dark-foreground max-w-xs leading-relaxed"
              }
            >
              Современная платформа управления детским садом, которая объединяет
              родителей и воспитателей в одном прекрасном опыте.
            </p>
            <p
              className={
                "text-sm text-muted-light-foreground dark:text-muted-dark-foreground"
              }
            >
              © 2026 Киндер. Все права защищены.
            </p>
          </div>
          {sectionListData.map((item) => {
            return (
              <div
                key={item.title}
                className={"flex flex-col font-semibold text-sm"}
              >
                <p
                  className={
                    "mb-4 text-foreground-light dark:text-foreground-dark"
                  }
                >
                  {item.title}
                </p>
                <div
                  className={"flex flex-col gap-3 text-muted-light-foreground"}
                >
                  {item.links.map((link) => {
                    return (
                      <Link
                        href={link.url}
                        key={link.url}
                        className={
                          " dark:text-muted-dark-foreground transition-colors duration-150 ease-in-out" +
                          " hover:text-foreground-light dark:hover:text-foreground-dark"
                        }
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
