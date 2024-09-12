"use client";
import { createContext } from "react";
import { useState } from "react";

export const LoaderContext = createContext<{
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}>({ progress: 0, setProgress: () => null });

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);

  return (
    <LoaderContext.Provider value={{ progress, setProgress }}>
      {children}
    </LoaderContext.Provider>
  );
}
