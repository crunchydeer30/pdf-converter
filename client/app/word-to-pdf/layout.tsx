import type { Metadata } from "next";
import { ThemeWord } from "@/ui/themes/ThemeWord";
import ConverterLayout from "@/ui/layout/ConverterLayout";

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
  return <ConverterLayout theme={ThemeWord}>{children}</ConverterLayout>;
}
