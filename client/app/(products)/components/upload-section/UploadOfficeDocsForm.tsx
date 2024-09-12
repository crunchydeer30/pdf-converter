"use client";
import ChooseFileButton from "./ChooseFileButton";
import { Product } from "../../data/products";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { LoaderProvider } from "@/ui/loader/LoaderContext";
import LoaderBar from "@/ui/loader/LoaderBar";
import { useContext } from "react";
import { LoaderContext } from "@/ui/loader/LoaderContext";
import { useState } from "react";
import { officeToPdf, selectProduct } from "../../services";

interface UploadOfficeDocsFormProps {
  product: Product;
}

export default function UploadOfficeDocsForm({
  product,
}: UploadOfficeDocsFormProps) {
  const { setProgress } = useContext(LoaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const openFileInput = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      if (e.target.files.length === 1) {
        formData.append("file", e.target.files[0]);
        try {
          setIsLoading(true);
          const response = await officeToPdf(formData, setProgress);
          router.push(
            `${selectProduct(e.target.files[0].type)}/jobs/${response.jobId}`
          );
        } catch (e) {
          setIsLoading(false);
          setProgress(0);
        }
      }
    }
  };

  return (
    <LoaderProvider>
      <LoaderBar theme={product.theme} />
      <form>
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInput}
          hidden
          accept={product.mimes.join(",")}
        />
        <ChooseFileButton
          theme={product.theme}
          onClick={openFileInput}
          isLoading={isLoading}
        />
      </form>
    </LoaderProvider>
  );
}
