import { ThemeOpenOffice } from "@/ui/themes/Themes";
import { UploadSection } from "../../components/upload-section/UploadSection";
import UploadForm from "../../components/upload-section/UploadForm";
import ProductsSection from "../../components/products-section/ProductsSection";

export default function OpeThemeOpenOffice() {
  return (
    <>
      <UploadSection
        theme={ThemeOpenOffice}
        form={<UploadForm theme={ThemeOpenOffice} />}
      />
      <ProductsSection />
    </>
  );
}
