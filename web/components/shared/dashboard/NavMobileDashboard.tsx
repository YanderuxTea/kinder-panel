"use client";
import { NavDashboardData } from "@/data/NavDashboardData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RolesType } from "@/proxy";

export default function NavMobileDashboard({ role }: { role: RolesType }) {
  const pathname = usePathname();
  const currentPanel = pathname.split("/").at(-1);
  const navArray = NavDashboardData({
    role: role as "user" | "gl_admin" | "staff" | "sad_admin",
  });

  return (
    <nav
      className={
        "fixed lg:hidden bottom-0 p-4 border-t border-border-light dark:border-border-dark inset-x-0 bg-card-light" +
        " dark:bg-card-dark flex flex-row items-center justify-between h-18.25"
      }
    >
      {navArray.map((item) => {
        return (
          <Link
            href={`/dashboard/${item.url}`}
            key={item.title}
            className={
              "text-xs flex items-center justify-center flex-col gap-1 transition-colors duration-150 ease-in-out " +
              `  font-medium ${
                item.url === currentPanel
                  ? "text-primary-light dark:text-primary-dark"
                  : "text-muted-light-foreground" +
                    " dark:text-muted-dark-foreground"
              }`
            }
          >
            {item.icon}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
