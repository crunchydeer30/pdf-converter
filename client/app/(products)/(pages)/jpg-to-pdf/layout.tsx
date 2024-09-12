import type { Metadata } from "next";
import ThemedLayout from "@/ui/layout/ThemedLayout";
import { JpgToPdf } from "../../data/products";

export const metadata: Metadata = {
  title: "Best JPG to PDF Converter: Convert JPEG Images Online (FREE)",
  description:
    "Easily convert JPG, PNG, GIF, BMP and TIFF images to PDF using web-based online tool.",
};

export default function WordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemedLayout product={JpgToPdf}>{children}</ThemedLayout>;
}
