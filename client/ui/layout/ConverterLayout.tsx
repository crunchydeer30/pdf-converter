import { Theme } from "../themes/types/Theme";
import { UploadSection } from "../upload-section/UploadSection";
import Layout from "./Layout";
import ProductsSection from "../products-section/ProductsSection";

interface ConverterLayoutProps {
  children: React.ReactNode;
  theme: Theme;
}

export default function ConverterLayout({ theme }: ConverterLayoutProps) {
  return (
    <Layout theme={theme}>
      <UploadSection theme={theme} />
      <ProductsSection />
    </Layout>
  );
}
