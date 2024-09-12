import { LoaderProvider } from "@/ui/loader/LoaderContext";
import LoaderBar from "@/ui/loader/LoaderBar";
import { Product } from "../../data/products";

interface UploadFormWrapperProps {
  product: Product;
  children: React.ReactNode;
}

export default function UploadFormWrapper({
  product,
  children,
}: UploadFormWrapperProps) {
  return (
    <LoaderProvider>
      <LoaderBar theme={product.theme} />
      {children}
    </LoaderProvider>
  );
}
