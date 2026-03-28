import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isError: boolean;
}
export default function Input() {
  return <input />;
}
