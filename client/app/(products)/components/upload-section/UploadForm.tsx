"use client";
import ChooseFileButton from "./ChooseFileButton";
import { Theme } from "@/ui/themes/types/Theme";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { LoaderProvider } from "@/ui/loader/LoaderContext";
import LoaderBar from "@/ui/loader/LoaderBar";
import { useContext } from "react";
import { LoaderContext } from "@/ui/loader/LoaderContext";
import { useState } from "react";
import { officeToPdf, selectProductHandler } from "../../services";

interface UploadFormProps {
  theme: Theme;
}

export default function UploadForm({ theme }: UploadFormProps) {
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
        console.log(e.target.files[0]);
        formData.append("file", e.target.files[0]);
        try {
          setIsLoading(true);
          const response = await officeToPdf(formData, setProgress);
          router.push(
            `/${selectProductHandler(e.target.files[0].type)}/jobs/${
              response.jobId
            }`
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
      <LoaderBar theme={theme} />
      <form>
        <input type="file" onChange={handleFileChange} ref={fileInput} hidden />
        <ChooseFileButton
          theme={theme}
          onClick={openFileInput}
          isLoading={isLoading}
        />
      </form>
    </LoaderProvider>
  );
}
