import { ReactNode } from "react";
import { Theme } from "@/ui/themes/types/Theme";
import { Header } from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";

interface LayoutProps {
  children: ReactNode;
  theme: Theme;
}

export default function Layout({ children, theme }: LayoutProps) {
  return (
    <>
      <Header theme={theme} />
      <main className="grow-1">{children}</main>
      <Footer theme={theme} />
    </>
  );
}
