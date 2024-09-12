import { ThemeJPG } from "@/ui/themes/Themes";
import ProductsSection from "../../components/products-section/ProductsSection";
import { UploadSection } from "../../components/upload-section/UploadSection";
import UploadForm from "../../components/upload-section/UploadForm";

export default function JPG() {
  return (
    <>
      <UploadSection theme={ThemeJPG} form={<UploadForm theme={ThemeJPG} />} />
      <ProductsSection />
    </>
  );
}
