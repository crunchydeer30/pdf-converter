import { createContext } from "react";
import { useState } from "react";
import LoaderBar from "../components/upload-section/LoaderBar";
import { Theme } from "@/ui/themes/types/Theme";

export const UploadFormContext = createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  progress: 0,
  setProgress: () => null,
  isLoading: false,
  setIsLoading: () => null,
  isError: false,
  setIsError: () => null,
  error: "",
  setError: () => null,
  isModalOpen: false,
  setIsModalOpen: () => null,
});

export function UploadFormProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <UploadFormContext.Provider
      value={{
        progress,
        setProgress,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        error,
        setError,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      <LoaderBar progress={progress} isLoading={isLoading} theme={theme} />
      {children}
    </UploadFormContext.Provider>
  );
}
