export const ArrowIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={"fill-none w-4 h-4"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19"
        className={
          "stroke-2 stroke-primary-light-foreground dark:stroke-primary-dark-foreground"
        }
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      />
      <path
        d="M12 5L19 12L12 19"
        className={
          "stroke-2 stroke-primary-light-foreground dark:stroke-primary-dark-foreground"
        }
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      />
    </svg>
  );
};
