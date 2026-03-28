export const BurgerMenuIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={"fill-none w-5 h-5"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5H20"
        className={
          "stroke-2 stroke-foreground-light dark:stroke-foreground-dark dark:group-hover:stroke-foreground-light" +
          " transition-colors duration-150 ease-in-out"
        }
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      />
      <path
        d="M4 12H20"
        className={
          "stroke-2 stroke-foreground-light dark:stroke-foreground-dark dark:group-hover:stroke-foreground-light" +
          " transition-colors duration-150 ease-in-out"
        }
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      />
      <path
        d="M4 19H20"
        className={
          "stroke-2 stroke-foreground-light dark:stroke-foreground-dark dark:group-hover:stroke-foreground-light" +
          " transition-colors duration-150 ease-in-out"
        }
        style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
      />
    </svg>
  );
};
