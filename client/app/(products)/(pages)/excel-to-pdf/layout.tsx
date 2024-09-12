import type { Metadata } from "next";
import ThemedLayout from "@/ui/layout/ThemedLayout";
import { ExcelToPdf } from "../../data/products";

export const metadata: Metadata = {
  title: "Best Excel to PDF Converter: Convert XLS Files Online (FREE)",
  description:
    "The PDF converter for converting Excel XLS documents to PDF files. Simple usage, perfect conversion quality, fast and secure!",
};

export default function WordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemedLayout product={ExcelToPdf}>{children}</ThemedLayout>;
}
