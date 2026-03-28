"use client";

export default function UserAvatar({
  size,
  fullname,
}: {
  size: "sm" | "md" | "lg";
  fullname: string;
}) {
  const text = fullname
    .split(" ")
    .map((val) => val.charAt(0))
    .join("");

  return (
    <div
      className={
        `${
          size === "sm"
            ? "w-8 h-8 text-sm rounded-full"
            : size === "md"
              ? "w-10 h-10 rounded-full"
              : size === "lg"
                ? "w-20" + " h-20 rounded-3xl text-2xl"
                : "w-8 h-8"
        }  ' +
          ' flex justify-center items-center text-mint-light` +
        " dark:text-mint-dark bg-mint-light-light dark:bg-mint-dark-light shrink-0 select-none pointer-events-none"
      }
    >
      {text}
    </div>
  );
}
