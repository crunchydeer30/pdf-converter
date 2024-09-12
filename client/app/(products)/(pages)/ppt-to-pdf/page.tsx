import UploadForm from "../../components/upload-section/UploadForm";
import { ThemePPT } from "@/ui/themes/Themes";
import { UploadSection } from "../../components/upload-section/UploadSection";
import ProductsSection from "../../components/products-section/ProductsSection";

export default function PPT() {
  return (
    <>
      <UploadSection theme={ThemePPT} form={<UploadForm theme={ThemePPT} />} />
      <ProductsSection />
    </>
  );
}
