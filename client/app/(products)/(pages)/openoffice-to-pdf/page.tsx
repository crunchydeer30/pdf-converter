import { UploadSection } from "../../components/upload-section/UploadSection";
import ProductsSection from "../../components/products-section/ProductsSection";
import { OpenOfficeToPdf } from "../../data/products";

export default function OpeThemeOpenOffice() {
  return (
    <>
      <UploadSection product={OpenOfficeToPdf} />
      <ProductsSection />
    </>
  );
}
