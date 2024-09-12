"use client";
import {
  ExtendableClassNames,
  extendClassNames,
} from "../../../../ui/extendableClassNames/extendable";
import { Theme } from "../../../../ui/themes/types/Theme";
import { motion } from "framer-motion";

interface DownloadButtonProps extends ExtendableClassNames {
  theme: Theme;
  className?: string;
  onClick: () => void;
}

export default function DownloadButton({
  theme,
  ...props
}: DownloadButtonProps) {
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
    "w-[400px]",
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
    <motion.button
      type="button"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.75 }}
      className={className.join(" ")}
      onClick={props.onClick}
    >
      <span className="absolute left-6">
        <svg className="w-8 h-8 fill-white">
          <use href={`/assets/icons.svg#download`}></use>
        </svg>
      </span>
      <span>Download</span>
    </motion.button>
  );
}
