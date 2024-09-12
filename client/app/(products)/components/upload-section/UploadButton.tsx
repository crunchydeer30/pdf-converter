"use client";
import {
  ExtendableClassNames,
  extendClassNames,
} from "../../../../ui/extendableClassNames/extendable";
import { Theme } from "../../../../ui/themes/types/Theme";

interface UploadButtonProps extends ExtendableClassNames {
  theme: Theme;
  className?: string;
  onClick: () => void;
  isLoading?: boolean;
}

export default function UploadButton({
  theme,
  isLoading,
  onClick,
  ...props
}: UploadButtonProps) {
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
    <button
      type="button"
      className={className.join(" ")}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="absolute left-6">+</span>
      ) : (
        <span className="absolute left-6">+</span>
      )}
      <span>Choose File</span>
    </button>
  );
}
