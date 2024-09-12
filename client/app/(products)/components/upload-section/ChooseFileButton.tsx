"use client";
import {
  ExtendableClassNames,
  extendClassNames,
} from "../../../../ui/extendableClassNames/extendable";
import { Theme } from "../../../../ui/themes/types/Theme";

interface ChooseFileButtonProps extends ExtendableClassNames {
  theme: Theme;
  className?: string;
  onClick: () => void;
  isLoading?: boolean;
}

export default function ChooseFileButton({
  theme,
  isLoading,
  onClick,
  ...props
}: ChooseFileButtonProps) {
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
    `disabled:bg-${theme.color}-light`,
    `disabled:opacity-50`,
    "disabled:cursor-not-allowed",
    "cursor-pointer",
  ];
  extendClassNames(props, className);

  return (
    <button
      type="button"
      className={className.join(" ")}
      onClick={onClick}
      disabled={Boolean(isLoading)}
    >
      {isLoading ? (
        <span className="absolute left-6">
          <svg className="w-6 h-6 fill-white animate-spin">
            <use href={`/assets/icons.svg#spinner1`}></use>
          </svg>
        </span>
      ) : (
        <span className="absolute left-6">+</span>
      )}
      <span>Choose File</span>
    </button>
  );
}
