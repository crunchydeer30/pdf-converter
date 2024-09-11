import { Theme } from "../themes/types/Theme";
import { UploadSection } from "../../app/(products)/components/upload-section/UploadSection";
import ProductsSection from "../../app/(products)/components/products-section/ProductsSection";

interface ConverterLayoutProps {
  theme: Theme;
}

export default function ConverterLayout({ theme }: ConverterLayoutProps) {
  return (
    <>
      {/* <UploadSection theme={theme} onSubmit={() => {}} /> */}
      <ProductsSection />
    </>
  );
}
