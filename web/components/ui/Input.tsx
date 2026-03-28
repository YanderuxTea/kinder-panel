import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";

type ErrorPack<T> =
  | {
      isEnableError: true;
      isError: T;
      setIsError: Dispatch<SetStateAction<Record<keyof T, boolean>>>;
      keyInput: keyof T;
    }
  | { isEnableError: false };
interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  errorPack: ErrorPack<T>;
}
export default function Input<T>({
  errorPack,
  iconLeft,
  iconRight,
  ...props
}: Props<T>) {
  const isErrorPack = errorPack.isEnableError;
  return (
    <div
      className={
        "relative flex text-muted-light-foreground dark:text-muted-dark-foreground"
      }
    >
      <div className={"absolute top-1/2 left-3 -translate-y-1/2"}>
        {iconLeft}
      </div>
      <input
        onChange={
          isErrorPack
            ? () =>
                errorPack.setIsError((prev) => {
                  return { ...prev, [errorPack.keyInput]: false };
                })
            : undefined
        }
        {...props}
        className={`${
          isErrorPack
            ? errorPack.isError[errorPack.keyInput]
              ? "border-destructive-light dark:border-destructive-dark" +
                " focus:ring-destructive-light/20 dark:focus:ring-destructive-dark/50"
              : "border-input-light" +
                " dark:border-input-dark" +
                " focus:border-ring-light" +
                " dark:focus:border-ring-dark focus:ring-ring-light/50 dark:focus:ring-ring-dark/50"
            : "border-input-light" +
              " dark:border-input-dark" +
              " focus:border-ring-light" +
              " dark:focus:border-ring-dark focus:ring-ring-light/50 dark:focus:ring-ring-dark/50"
        } px-3 transition-all duration-150 ease-in-out outline-none py-1 text-foreground-light dark:text-foreground-dark bg-transparent placeholder:text-muted-light-foreground dark:placeholder:text-muted-dark-foreground  dark:bg-input-dark/30 text-sm font-medium w-full h-12 rounded-3xl border  selection:bg-primary-light dark:selection:bg-primary-dark focus:ring-[3px] ${iconLeft ? "pl-10" : ""} ${iconRight ? "pr-10" : ""}`}
      />
      <div
        className={
          "absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center"
        }
      >
        {iconRight}
      </div>
    </div>
  );
}
