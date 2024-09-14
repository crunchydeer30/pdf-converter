import { UploadSection } from "../../components/upload-section/UploadSection";
import ProductsSection from "../../components/products-section/ProductsSection";
import { PptToPdf } from "../../data/products";

export default function PPT() {
  return (
    <>
      <UploadSection product={PptToPdf} />
      <ProductsSection />
    </>
  );
}
