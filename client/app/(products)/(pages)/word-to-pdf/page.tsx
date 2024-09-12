import ProductsSection from "../../components/products-section/ProductsSection";
import UploadForm from "../../components/upload-section/UploadForm";
import { UploadSection } from "../../components/upload-section/UploadSection";
import { ThemeWord } from "@/ui/themes/Themes";

export default function Word() {
  return (
    <>
      <UploadSection
        theme={ThemeWord}
        form={<UploadForm theme={ThemeWord} />}
      />
      <ProductsSection />
    </>
  );
}
