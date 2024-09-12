import { LoaderProvider } from "@/ui/loader/LoaderContext";
import LoaderBar from "@/ui/loader/LoaderBar";
import { Theme } from "@/ui/themes/types/Theme";

interface UploadFormWrapperProps {
  theme: Theme;
  children: React.ReactNode;
}

export default function UploadFormWrapper({
  theme,
  children,
}: UploadFormWrapperProps) {
  return (
    <LoaderProvider>
      <LoaderBar theme={theme} />
      {children}
    </LoaderProvider>
  );
}
