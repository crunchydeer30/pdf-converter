"use client";
import React from "react";
import { ThemeWord } from "@/ui/themes/Themes";
import JobTemplate from "@/app/(products)/components/jobs/JobTemplate";

export default function Template({ children }: { children: React.ReactNode }) {
  return <JobTemplate theme={ThemeWord}>{children}</JobTemplate>;
}
