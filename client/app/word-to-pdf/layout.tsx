import type { Metadata } from "next";
import { ThemeWord } from "@/ui/themes/ThemeWord";
import Layout from "@/ui/layout/Layout";

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
  return <Layout theme={ThemeWord}>{children}</Layout>;
}
