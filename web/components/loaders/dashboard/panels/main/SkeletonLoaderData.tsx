import { HTMLAttributes } from "react";

export default function SkeletonLoaderData({
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <div
      {...props}
      className={
        "animate-pulse bg-border-light dark:bg-border-dark w-12 h-5 rounded-2xl"
      }
    ></div>
  );
}
