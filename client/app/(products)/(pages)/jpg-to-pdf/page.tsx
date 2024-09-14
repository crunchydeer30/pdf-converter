import ProductsSection from "../../components/products-section/ProductsSection";
import { UploadSection } from "../../components/upload-section/UploadSection";
import { JpgToPdf } from "../../data/products";

export default function JPG() {
  return (
    <>
      <UploadSection product={JpgToPdf} />
      <ProductsSection />
    </>
  );
}
