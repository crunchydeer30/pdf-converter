import { useContext } from "react";
import { UploadFormContext } from "../../context/UploadFormContext";
import { motion } from "framer-motion";
import { Button } from "@/ui/button/Button";
import { Theme } from "@/ui/themes/types/Theme";
import { useState } from "react";
import { officeToPdfLink, selectProductLink } from "../../services";
import { useRouter } from "next/navigation";
import { getServerErrorMessage } from "@/utils";

interface UrlInputProps {
  theme: Theme;
}

export default function UrlInput({ theme }: UrlInputProps) {
  const {
    isModalOpen,
    setIsModalOpen,
    setIsLoading,
    setProgress,
    setIsError,
    setError,
  } = useContext(UploadFormContext);
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsModalOpen(false);
      setIsLoading(true);
      const response = await officeToPdfLink(url, setProgress);
      router.push(
        `${selectProductLink(url, response.fileMeta.fileType)}/jobs/${
          response.jobId
        }`
      );
    } catch (e) {
      setIsLoading(false);
      setProgress(0);
      setIsError(true);
      setError(getServerErrorMessage(e));
      setTimeout(() => {
        setIsError(false);
        setError("");
      }, 4000);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed h-screen w-screen top-0 left-0 transform backdrop-brightness-50 flex justify-center items-center">
          <motion.form
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white relative w-[700px] shadow-lg rounded-xl flex flex-col items-center gap-12 p-10 bg-gray-100"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-bold">Enter file location</h1>
            <input
              type="url"
              placeholder="Enter file URL"
              className={`bg-white rounded border-[1px] p-3 w-[450px] text-sm focus:outline-none`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button theme={theme} type="submit" className="!w-[400px] !py-4">
              Enter
            </Button>
            <button onClick={() => setIsModalOpen(false)}>
              <svg className="w-5 h-5 absolute top-6 right-6">
                <use href={`/assets/icons.svg#close`}></use>
              </svg>
            </button>
          </motion.form>
        </div>
      )}
    </>
  );
}
