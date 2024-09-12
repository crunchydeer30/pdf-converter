"use client";
import { Theme } from "../themes/types/Theme";
import { LoaderContext, LoaderProvider } from "./LoaderContext";
import { useContext } from "react";

interface LoaderBarProps {
  theme: Theme;
}

export default function LoaderBar({ theme }: LoaderBarProps) {
  const { progress } = useContext(LoaderContext);

  return (
    <LoaderProvider>
      <div
        className={`absolute top-0 left-0 h-[5px] bg-${theme.color} transition-all`}
        style={{ width: `${progress}%` }}
      ></div>
    </LoaderProvider>
  );
}
