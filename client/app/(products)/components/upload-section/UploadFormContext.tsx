import { createContext } from "react";
import { useState } from "react";
import LoaderBar from "./LoaderBar";
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
}>({
  progress: 0,
  setProgress: () => null,
  isLoading: false,
  setIsLoading: () => null,
  isError: false,
  setIsError: () => null,
  error: "",
  setError: () => null,
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
      }}
    >
      <LoaderBar progress={progress} isLoading={isLoading} theme={theme} />
      {children}
    </UploadFormContext.Provider>
  );
}
