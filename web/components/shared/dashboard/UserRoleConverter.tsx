"use client";
import { HTMLAttributes } from "react";
import { RolesType } from "@/proxy";

interface Props extends HTMLAttributes<HTMLElement> {
  roleConst: RolesType;
}
export default function UserRoleConverter({ roleConst, ...props }: Props) {
  const role =
    roleConst === "user"
      ? "Родитель"
      : roleConst === "staff"
        ? "Воспитатель"
        : roleConst === "sad_admin"
          ? "Администратор садика"
          : roleConst === "gl_admin"
            ? "Администратор"
            : "";
  return <p {...props}>{role}</p>;
}
