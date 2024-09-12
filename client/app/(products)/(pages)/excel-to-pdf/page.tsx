import { ThemeExcel } from "@/ui/themes/Themes";
import { UploadSection } from "../../components/upload-section/UploadSection";
import UploadForm from "../../components/upload-section/UploadForm";
import ProductsSection from "../../components/products-section/ProductsSection";

export default function Excel() {
  return (
    <>
      <UploadSection
        theme={ThemeExcel}
        form={<UploadForm theme={ThemeExcel} />}
      />
      <ProductsSection />
    </>
  );
}
