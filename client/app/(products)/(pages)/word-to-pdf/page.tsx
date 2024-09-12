import ProductsSection from "../../components/products-section/ProductsSection";
import UploadForm from "../../components/upload-section/UploadOfficeDocsForm";
import { UploadSection } from "../../components/upload-section/UploadSection";
import { WordToPdf } from "../../data/products";

export default function Word() {
  return (
    <>
      <UploadSection
        product={WordToPdf}
        form={<UploadForm product={WordToPdf} />}
      />
      <ProductsSection />
    </>
  );
}
