"use client";
import Logo from "@/components/shared/Logo";
import UserAvatar from "@/components/shared/UserAvatar";
import UserRoleConverter from "@/components/shared/dashboard/UserRoleConverter";
import { RolesType } from "@/proxy";
import { NavDashboardData } from "@/data/NavDashboardData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDashboard({
  fullname,
  role,
}: {
  fullname: string;
  role: RolesType;
}) {
  const arrayNav = NavDashboardData({ role: role });
  const pathname = usePathname();
  const currentPathname = pathname.split("/").at(-1);
  return (
    <aside
      className={
        "hidden lg:fixed inset-y-0 lg:flex lg:flex-col w-64 bg-card-light dark:bg-card-dark border-r" +
        " border-border-light dark:border-border-dark"
      }
    >
      <div
        className={
          "h-16 flex items-center px-6 border-b border-border-light dark:border-border-dark"
        }
      >
        <Logo />
      </div>
      <nav className={"flex-1 p-4 flex flex-col gap-1"}>
        {arrayNav.map((item) => {
          return (
            <Link
              href={item.url}
              key={item.title}
              className={`flex flex-row gap-3 ${
                item.url === currentPathname
                  ? "bg-primary-light dark:bg-primary-dark text-primary-light-foreground dark:text-primary-dark-foreground"
                  : "text-muted-light-foreground' dark:text-muted-dark-foreground hover:bg-muted-light dark:hover:bg-muted-dark hover:text-foreground-light dark:hover:text-foreground-dark"
              }
              text-sm font-medium rounded-3xl items-center px-4 py-3 transition-colors duration-150 ease-in-out `}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div
        className={"p-4 border-t border-border-light dark:border-border-dark"}
      >
        <div
          className={
            "p-3 rounded-3xl bg-muted-light/50 dark:bg-muted-dark/50 flex flex-row gap-3 items-center"
          }
        >
          <UserAvatar size={"md"} fullname={fullname} />
          <div className={"flex flex-col truncate"}>
            <p
              className={
                "text-sm font-medium text-foreground-light dark:text-foreground-dark truncate"
              }
            >
              {fullname}
            </p>
            {fullname && (
              <UserRoleConverter
                roleConst={role}
                className={
                  "text-xs text-muted-light-foreground dark:text-muted-dark-foreground truncate"
                }
              />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
