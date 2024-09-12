"use client";
import UploadButton from "@/app/(products)/components/upload-section/UploadButton";
import { Theme } from "@/ui/themes/types/Theme";
import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoaderProvider } from "@/ui/loader/LoaderContext";
import LoaderBar from "@/ui/loader/LoaderBar";
import { useContext } from "react";
import { LoaderContext } from "@/ui/loader/LoaderContext";
import axios from "axios";

interface UploadFormProps {
  theme: Theme;
}

export default function UploadForm({ theme }: UploadFormProps) {
  const { setProgress } = useContext(LoaderContext);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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
          const response = await axios.post(
            "http://localhost:8000/api/v1/converter/office-to-pdf",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 90) / (progressEvent.total || 1)
                  );
                  console.log(percentCompleted);
                  setProgress(percentCompleted);
                }
              },
            }
          );
          setProgress(100);
          router.push(
            `${pathname === "/" ? "" : pathname}/jobs/${response.data.jobId}`
          );
        } catch (e) {
          console.error(e);
        } finally {
          setTimeout(() => setProgress(0), 200);
        }
      }
    }
  };

  return (
    <LoaderProvider>
      <LoaderBar theme={theme} />
      <form>
        <input type="file" onChange={handleFileChange} ref={fileInput} hidden />
        <UploadButton theme={theme} onClick={openFileInput} />
      </form>
    </LoaderProvider>
  );
}
