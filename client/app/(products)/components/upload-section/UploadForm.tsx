"use client";
import { Product } from "../../data/products";
import { UploadFormProvider } from "../../context/UploadFormContext";
import OfficeDocsForm from "./OfficeDocsForm";

interface UploadFormProps {
  product: Product;
}

export default function UploadForm({ product }: UploadFormProps) {
  return (
    <UploadFormProvider theme={product.theme}>
      <OfficeDocsForm product={product} />
    </UploadFormProvider>
  );
}
