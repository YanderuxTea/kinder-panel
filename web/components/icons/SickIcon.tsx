export const SickIcon = ({ size }: { size: "md" | "lg" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-none ${size === "md" ? "w-5 h-5" : "w-6 h-6"}`}
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        className={"stroke-2"}
        style={{
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
      <path
        d="M12 8V12"
        className={"stroke-2"}
        style={{
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
      <path
        d="M12 16H12.01"
        className={"stroke-2"}
        style={{
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      />
    </svg>
  );
};
