import type { Metadata } from "next";
import ThemedLayout from "@/ui/layout/ThemedLayout";
import { ThemeOpenOffice } from "@/ui/themes/Themes";

export const metadata: Metadata = {
  title: "Convert OpenOffice ODT files to PDF online and free",
  description:
    "Easily convert OpenOffice ODT files to PDF using this free OpenOffice to PDF converter.",
};

export default function WordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemedLayout theme={ThemeOpenOffice}>{children}</ThemedLayout>;
}
