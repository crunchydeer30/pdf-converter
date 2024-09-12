import { UploadSection } from "../../components/upload-section/UploadSection";
import UploadForm from "../../components/upload-section/UploadOfficeDocsForm";
import ProductsSection from "../../components/products-section/ProductsSection";
import { OpenOfficeToPdf } from "../../data/products";

export default function OpeThemeOpenOffice() {
  return (
    <>
      <UploadSection
        product={OpenOfficeToPdf}
        form={<UploadForm product={OpenOfficeToPdf} />}
      />
      <ProductsSection />
    </>
  );
}
