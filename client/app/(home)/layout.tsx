import { ThemeDefault } from "@/ui/themes/Themes";
import type { Metadata } from "next";
import ThemedLayout from "@/ui/layout/ThemedLayout";
import { Default } from "../(products)/data/products";

export const metadata: Metadata = {
  title: "Best PDF Converter: Create, Convert PDF Files Online (FREE)",
  description:
    "PDF Converter is a online web-based document to PDF converter software. Convert and create PDF from various types of files like Word DOC, Excel XLS, PowerPoint PPT.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ThemedLayout product={Default}>{children}</ThemedLayout>;
}
