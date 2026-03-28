"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
export default function Button({
  children,
  className,
  iconRight,
  iconLeft,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`flex flex-row gap-2 items-center justify-center ${className} transition-all duration-150 ease-in-out cursor-pointer active:scale-95 rounded-full`}
    >
      {iconLeft && <span>{iconLeft}</span>}
      {children}
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
}
