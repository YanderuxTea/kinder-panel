import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { headers } from "next/headers";
import { nunito } from "@/lib/font";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Киндер | Главная",
  description:
    "Автоматизация посещаемости, питания и объявлений для детских садов",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce");
  return (
    <html
      lang="ru"
      className={`h-full antialiased ${nunito.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background-light dark:bg-background-dark">
        <ThemeProvider
          nonce={nonce || undefined}
          attribute={"class"}
          defaultTheme={"system"}
          disableTransitionOnChange
          enableSystem
        >
          <Toaster position={"top-center"} richColors={true} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
