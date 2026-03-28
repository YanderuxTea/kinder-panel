type SectionListData = {
  title: string;
  links: {
    title: string;
    url: string;
  }[];
};
export const sectionListData: SectionListData[] = [
  {
    title: "Продукт",
    links: [
      { title: "Функции", url: "#features" },
      { title: "Цены", url: "#pricing" },
      { title: "Демо", url: "#demo" },
      { title: "Интеграции", url: "#integrations" },
    ],
  },
  {
    title: "Компания",
    links: [
      { title: "О нас", url: "#about" },
      { title: "Карьера", url: "#careers" },
      { title: "Блог", url: "#blog" },
      { title: "Пресса", url: "#press" },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { title: "Справочный центр", url: "#help" },
      { title: "Документация", url: "#documentation" },
      { title: "API", url: "#api" },
      { title: "Сообщество", url: "#community" },
    ],
  },
  {
    title: "Законно",
    links: [
      { title: "Политика конфиденциальности", url: "#privacy" },
      { title: "Условия обслуживания", url: "#terms" },
      { title: "Политика в отношении файлов cookie", url: "#cookies" },
    ],
  },
];
