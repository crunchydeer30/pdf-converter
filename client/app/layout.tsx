import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans } from "next/font/google";

const imbPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Best PDF Converter: Create, Convert PDF Files Online (FREE)",
  description:
    "PDF Converter is a online web-based document to PDF converter software. Convert and create PDF from various types of files like Word DOC, Excel XLS, PowerPoint PPT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={imbPlexSans.className}>{children}</body>
    </html>
  );
}
