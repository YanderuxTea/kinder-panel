type NutritionDaysDataType = {
  title: string;
  value: "mon" | "tue" | "wed" | "thu" | "fri";
  times: {
    title: string;
    value: "breakfast" | "secondBreakfast" | "lunch" | "afternoonSnack";
  }[];
};
export const nutritionDaysData: NutritionDaysDataType[] = [
  {
    title: "Понедельник",
    value: "mon",
    times: [
      { title: "Завтрак", value: "breakfast" },
      { title: "Второй завтрак", value: "secondBreakfast" },
      { title: "Обед", value: "lunch" },
      { title: "Полдник", value: "afternoonSnack" },
    ],
  },
  {
    title: "Вторник",
    value: "tue",
    times: [
      { title: "Завтрак", value: "breakfast" },
      { title: "Второй завтрак", value: "secondBreakfast" },
      { title: "Обед", value: "lunch" },
      { title: "Полдник", value: "afternoonSnack" },
    ],
  },
  {
    title: "Среда",
    value: "wed",
    times: [
      { title: "Завтрак", value: "breakfast" },
      { title: "Второй завтрак", value: "secondBreakfast" },
      { title: "Обед", value: "lunch" },
      { title: "Полдник", value: "afternoonSnack" },
    ],
  },
  {
    title: "Четверг",
    value: "thu",
    times: [
      { title: "Завтрак", value: "breakfast" },
      { title: "Второй завтрак", value: "secondBreakfast" },
      { title: "Обед", value: "lunch" },
      { title: "Полдник", value: "afternoonSnack" },
    ],
  },
  {
    title: "Пятница",
    value: "fri",
    times: [
      { title: "Завтрак", value: "breakfast" },
      { title: "Второй завтрак", value: "secondBreakfast" },
      { title: "Обед", value: "lunch" },
      { title: "Полдник", value: "afternoonSnack" },
    ],
  },
];
