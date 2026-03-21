import type { Metadata } from "next";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import {ReactNode} from "react";
import {headers} from "next/headers";
import {nunito} from "@/lib/font";

export const metadata: Metadata = {
  title: "Киндер | Главная",
  description: "Автоматизация посещаемости, питания и объявлений для детских садов",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce')
  return (
    <html
      lang="ru"
      className={`h-full antialiased ${nunito.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
      <ThemeProvider nonce={nonce||undefined} attribute={'class'} defaultTheme={'system'} disableTransitionOnChange enableSystem>

        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
