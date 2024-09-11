import ThemedLayout from "@/ui/layout/ThemedLayout";
import type { Metadata } from "next";
import { ThemeWord } from "@/ui/themes/Themes";

export const metadata: Metadata = {
  title: "Best Word to PDF Converter: Convert DOCX Docs Online (FREE)",
  description:
    "Easily convert DOC and DOCX files to PDF using online Word to PDF converter.",
};

export default function WordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemedLayout theme={ThemeWord}>{children}</ThemedLayout>;
}
