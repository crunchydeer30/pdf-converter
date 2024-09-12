import { ThemeExcel } from "@/ui/themes/Themes";
import { UploadSection } from "../../components/upload-section/UploadSection";
import UploadForm from "../../components/upload-section/UploadOfficeDocsForm";
import ProductsSection from "../../components/products-section/ProductsSection";
import { ExcelToPdf } from "../../data/products";

export default function Excel() {
  return (
    <>
      <UploadSection
        product={ExcelToPdf}
        form={<UploadForm theme={ThemeExcel} />}
      />
      <ProductsSection />
    </>
  );
}
