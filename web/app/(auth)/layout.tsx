import { ReactNode } from "react";
import HeaderAuth from "@/components/shared/auth/HeaderAuth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "relative min-h-screen flex items-center justify-center px-4 pb-12 pt-19 "
      }
    >
      <HeaderAuth />
      <div
        className={
          "shadow-xl shadow-black/5 dark:shadow-black/20 bg-card-light dark:bg-card-dark border p-8" +
          " border-border-light dark:border-border-dark rounded-3xl overflow-clip"
        }
      >
        {children}
      </div>
    </div>
  );
}
