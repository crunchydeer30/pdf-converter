import { Theme } from "../themes/types/Theme";
import { UploadSection } from "../upload-section/UploadSection";
import Layout from "./Layout";

interface ConverterLayoutProps {
  children: React.ReactNode;
  theme: Theme;
}

export default function ConverterLayout({
  children,
  theme,
}: ConverterLayoutProps) {
  return (
    <Layout theme={theme}>
      <UploadSection theme={theme} />
      {children}
    </Layout>
  );
}
