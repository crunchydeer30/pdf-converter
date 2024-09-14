import ProductsSection from "@/app/(products)/components/products-section/ProductsSection";
import { UploadSection } from "@/app/(products)/components/upload-section/UploadSection";
import { Default } from "../(products)/data/products";

export default function Home() {
  return (
    <>
      <UploadSection product={Default} />
      <ProductsSection />
    </>
  );
}
