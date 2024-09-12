"use client";
import React from "react";
import { motion } from "framer-motion";
import { ThemeWord } from "@/ui/themes/Themes";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "15%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={`grow h-[90vh] bg-${ThemeWord.color}-very-light p-20`}
    >
      {children}
    </motion.div>
  );
}
