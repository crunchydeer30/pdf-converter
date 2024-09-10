import type { Metadata } from "next";

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
  return children;
}
