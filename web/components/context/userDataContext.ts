import { createContext } from "react";

export type JwtPayload = {
  id: string;
  fullname: string;
  sessionId: `${string}-${string}-${string}-${string}-${string}`;
  login: string;
  role: "user" | "gl_admin" | "sad_admin" | "staff";
  groupId: string;
  date: number;
};

export const UserDataContext = createContext<JwtPayload>({
  id: "",
  fullname: "",
  sessionId: "----",
  login: "",
  role: "user",
  date: 0,
  groupId: "",
});
