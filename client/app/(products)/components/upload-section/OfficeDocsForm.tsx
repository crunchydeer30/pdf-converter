"use client";
import { useContext, useRef } from "react";
import { UploadFormContext } from "../../context/UploadFormContext";
import { Product } from "../../data/products";
import { useRouter } from "next/navigation";
import { officeToPdf, selectProduct } from "../../services";
import ChooseFileButton from "./ChooseFileButton";
import UrlInput from "./UrlInput";

interface OfficeDocsFormProps {
  product: Product;
}

export default function OfficeDocsForm({ product }: OfficeDocsFormProps) {
  const { setIsLoading, setProgress, isLoading, setIsModalOpen } =
    useContext(UploadFormContext);
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
    <>
      <div className="flex flex-col gap-8 items-center">
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
        <div>
          <button
            className={`p-3 border border-gray-300 rounded-full bg-white hover:border-${product.theme.color} transition disabled:cursor-not-allowed`}
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
          >
            <svg className="w-5 h-5">
              <use href={`/assets/icons.svg#link`}></use>
            </svg>
          </button>
        </div>
      </div>
      <UrlInput theme={product.theme} />
    </>
  );
}
