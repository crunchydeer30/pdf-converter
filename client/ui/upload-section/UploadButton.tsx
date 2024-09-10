import {
  ExtendableClassNames,
  extendClassNames,
} from "../extendableClassNames/extendable";
import { Theme } from "../themes/types/Theme";

interface UploadButtonProps extends ExtendableClassNames {
  theme: Theme;
  className?: string;
}

export default function UploadButton({ theme, ...props }: UploadButtonProps) {
  const className = [
    "flex",
    "gap-2",
    "relative",
    "items-center",
    "justify-center",
    "text-white",
    `bg-${theme.color}`,
    `hover:bg-${theme.color}-light`,
    "transition",
    "py-6",
    "px-10",
    "w-[600px]",
    "rounded-full",
    "text-xl",
    "font-bold",
  ];
  extendClassNames(props, className);

  return (
    <button type="submit" className={className.join(" ")}>
      <span className="absolute left-6">+</span>
      <span>Choose File</span>
    </button>
  );
}
