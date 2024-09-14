import { Theme } from "@/ui/themes/types/Theme";

interface LoaderBarProps {
  theme: Theme;
  progress: number;
  isLoading: boolean;
}

export default function LoaderBar({ progress, theme }: LoaderBarProps) {
  return (
    <div
      className={`absolute top-0 left-0 h-[5px] bg-${theme.color} transition-all`}
      style={{ width: `${progress}%` }}
    ></div>
  );
}
