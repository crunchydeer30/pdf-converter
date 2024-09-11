import { ThemeDefault } from "@/ui/themes/Themes";
import ProductsSection from "@/app/(products)/components/products-section/ProductsSection";
import UploadForm from "../(products)/components/upload-section/UploadForm";
import { UploadSection } from "@/app/(products)/components/upload-section/UploadSection";

export default function Home() {
  return (
    <>
      <UploadSection
        theme={ThemeDefault}
        form={<UploadForm theme={ThemeDefault} />}
      />
      <ProductsSection />
    </>
  );
}
