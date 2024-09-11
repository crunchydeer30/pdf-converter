import { Theme } from "../themes/types/Theme";
import { UploadSection } from "../upload-section/UploadSection";
import ProductsSection from "../products-section/ProductsSection";

interface ConverterLayoutProps {
  theme: Theme;
}

export default function ConverterLayout({ theme }: ConverterLayoutProps) {
  return (
    <>
      <UploadSection theme={theme} />
      <ProductsSection />
    </>
  );
}
