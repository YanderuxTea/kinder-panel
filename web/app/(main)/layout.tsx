import { ReactNode } from "react";
import Header from "@/components/shared/main/Header";
import Footer from "@/components/shared/main/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
