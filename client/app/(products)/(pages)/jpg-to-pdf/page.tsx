import ProductsSection from "../../components/products-section/ProductsSection";
import { UploadSection } from "../../components/upload-section/UploadSection";
import UploadForm from "../../components/upload-section/UploadOfficeDocsForm";
import { JpgToPdf } from "../../data/products";

export default function JPG() {
  return (
    <>
      <UploadSection
        product={JpgToPdf}
        form={<UploadForm product={JpgToPdf} />}
      />
      <ProductsSection />
    </>
  );
}
