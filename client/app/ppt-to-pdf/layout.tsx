import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best PPT to PDF Converter: Convert Powerpoint Online (FREE)",
  description: "Easily convert PowerPoint to PDF using web-based online tool.",
};

export default function WordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
