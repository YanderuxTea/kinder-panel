type Props = {
  size: "sm" | "md";
};
export const CheckMark = ({ size }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`fill-none ${size === "sm" ? "w-4 h-4" : "w-5 h-5"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        className={"stroke-2 stroke-mint-light dark:stroke-mint-dark"}
        style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
      />
      <path
        d="M9 12L11 14L15 10"
        className={"stroke-2 stroke-mint-light dark:stroke-mint-dark"}
        style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
      />
    </svg>
  );
};
