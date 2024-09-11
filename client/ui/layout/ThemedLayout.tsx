import { ReactNode } from "react";
import { Theme } from "@/ui/themes/types/Theme";
import { Header } from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";

interface ThemedLayoutProps {
  children: ReactNode;
  theme: Theme;
}

export default function ThemedLayout({ children, theme }: ThemedLayoutProps) {
  return (
    <>
      <Header theme={theme} />
      <main className="grow flex flex-col">{children}</main>
      <Footer theme={theme} />
    </>
  );
}
