"use client";
import UploadButton from "@/app/(products)/components/upload-section/UploadButton";
import { Theme } from "@/ui/themes/types/Theme";
import { upload } from "../../services";
import { useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface UploadFormProps {
  theme: Theme;
}

export default function UploadForm({ theme }: UploadFormProps) {
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
          console.log(pathname);
          const response = await upload(formData);
          console.log(response);
          router.push(`${pathname}/jobs/${response.jobId}`);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <form>
      <input type="file" onChange={handleFileChange} ref={fileInput} hidden />
      <UploadButton theme={theme} onClick={openFileInput} />
    </form>
  );
}
